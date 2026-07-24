"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Volume2, Sparkles, Loader2 } from "lucide-react";
import { askGemini } from "@/services/ai/gemini";

// ── Types ──
type Status = "idle" | "listening" | "processing" | "speaking" | "error";

interface SpeechWindow extends Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

// ── Helpers ──
function getSpeechRecognition(): SpeechRecognition | null {
  const w = window as unknown as SpeechWindow;
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  return new Ctor();
}

function speak(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("speechSynthesis not available"));
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1.1;
    utterance.pitch = 1.0;

    // Timeout fallback — some Chrome versions never fire onend
    const timeout = setTimeout(() => resolve(), 8000);

    utterance.onend = () => {
      clearTimeout(timeout);
      resolve();
    };
    utterance.onerror = (e) => {
      clearTimeout(timeout);
      reject(e);
    };

    window.speechSynthesis.speak(utterance);
  });
}

// ── Component ──
export default function VoiceAssistant() {
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const statusRef = useRef<Status>("idle");
  const [isSupported, setIsSupported] = useState(true);

  // Keep statusRef in sync with status state (avoids stale closures)
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    const supported = !!getSpeechRecognition();
    setIsSupported(supported);
    if (!supported) {
      setErrorMessage(
        "Web Speech API não suportada neste navegador. Use Chrome ou Edge."
      );
      setStatus("error");
    }
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const sendToGemini = useCallback(async (text: string) => {
    const prompt = `Você é um assistente de IA amigável que fala português do Brasil. Responda de forma clara, direta e concisa (máximo 3 frases). Pergunta do usuário: "${text}"`;

    const result = await askGemini(prompt);

    if (result.error) {
      setErrorMessage(result.error);
      setStatus("error");
      return;
    }

    const reply = result.text;
    setResponse(reply);
    setStatus("speaking");

    try {
      await speak(reply);
      setStatus("idle");
    } catch {
      setStatus("idle");
    }
  }, []);

  // Stable ref to avoid stale closure in recognition callbacks
  const sendToGeminiRef = useRef(sendToGemini);
  sendToGeminiRef.current = sendToGemini;

  const startListening = useCallback(() => {
    // Prevent concurrent requests if already active
    if (statusRef.current !== "idle") return;

    setErrorMessage("");
    setTranscript("");
    setResponse("");
    setStatus("listening");
    isListeningRef.current = true;

    const recognition = getSpeechRecognition();
    if (!recognition) {
      setErrorMessage("Web Speech API não disponível");
      setStatus("error");
      isListeningRef.current = false;
      return;
    }

    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setStatus("processing");
      sendToGeminiRef.current(text);
    };

    recognition.onerror = (event) => {
      console.error("[Voice] Recognition error:", event.error);
      setErrorMessage(`Erro ao reconhecer: ${event.error}`);
      setStatus("error");
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      // Use ref instead of stale state closure
      if (isListeningRef.current) {
        isListeningRef.current = false;
        setStatus("idle");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    recognitionRef.current?.stop();
    setStatus("idle");
  }, []);

  const replayResponse = useCallback(() => {
    if (!response) return;
    setStatus("speaking");
    speak(response).finally(() => setStatus("idle"));
  }, [response]);

  // ── Render ──
  return (
    <div className="w-full max-w-md mx-auto bg-black border-2 border-white p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center">
          <Sparkles size={20} className="text-black" />
        </div>
        <div>
          <h2 className="text-white text-sm font-bold uppercase tracking-wider">
            Assistente de Voz
          </h2>
          <p className="text-gray text-[10px] uppercase tracking-widest font-semibold">
            Gemini + Web Speech
          </p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mb-6 flex items-center justify-between border border-white p-3">
        <span className="text-white text-xs uppercase tracking-wider font-bold">
          {status === "idle" && "○ Aguardando"}
          {status === "listening" && "◉ Escutando..."}
          {status === "processing" && "◉ Processando..."}
          {status === "speaking" && "◉ Falando..."}
          {status === "error" && "◉ Erro"}
        </span>
        {status === "listening" && (
          <span className="w-3 h-3 bg-white" />
        )}
        {status === "processing" && (
          <Loader2 size={14} className="text-white animate-spin" />
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="mb-4 p-3 bg-white/5 border border-white/20">
          <p className="text-[10px] text-gray uppercase tracking-widest font-bold mb-1">
            Você disse:
          </p>
          <p className="text-white text-sm">{transcript}</p>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="mb-6 p-3 bg-white/5 border border-white/20">
          <p className="text-[10px] text-gray uppercase tracking-widest font-bold mb-1">
            Resposta:
          </p>
          <p className="text-white text-sm leading-relaxed">{response}</p>
        </div>
      )}

      {/* Error */}
      {errorMessage && (
        <div className="mb-6 p-3 bg-neon-magenta/10 border border-neon-magenta">
          <p className="text-[10px] text-neon-magenta uppercase tracking-widest font-bold mb-1">
            Erro
          </p>
          <p className="text-white text-xs">{errorMessage}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {status !== "listening" ? (
          <button
            onClick={startListening}
            disabled={!isSupported || status === "processing"}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold uppercase text-sm tracking-wider border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Mic size={16} />
            {status === "idle" ? "Falar" : "Ouvir"}
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neon-magenta text-white font-bold uppercase text-sm tracking-wider border-2 border-neon-magenta hover:bg-transparent transition-colors duration-100"
          >
            <MicOff size={16} />
            Parar
          </button>
        )}

        {response && (
          <button
            onClick={replayResponse}
            disabled={status === "speaking"}
            className="px-4 py-3 bg-transparent text-white font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-white hover:text-black transition-colors duration-100 disabled:opacity-30"
          >
            <Volume2 size={16} />
          </button>
        )}
      </div>

      {/* Browser support warning */}
      {!isSupported && (
        <p className="mt-4 text-[10px] text-gray uppercase tracking-wider text-center">
          Use Chrome, Edge ou Safari para ativar o microfone
        </p>
      )}
    </div>
  );
}
