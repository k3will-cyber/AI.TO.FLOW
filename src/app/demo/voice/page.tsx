"use client";

import VoiceAssistant from "@/components/VoiceAssistant";
import BrutalistButton from "@/design-system/Button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function VoiceDemoPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="border-b-2 border-white">
        <div className="container-brutal flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a
              href="/demo"
              className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider hover:text-neon-cyan transition-colors"
            >
              <ArrowLeft size={14} />
              Voltar
            </a>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-neon-cyan" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">
                Assistente de Voz
              </span>
            </div>
          </div>
          <span className="text-gray text-[10px] font-bold uppercase tracking-widest">
            Gemini + Web Speech
          </span>
        </div>
      </header>

      {/* Hero section */}
      <section className="container-brutal pt-16 pb-8 text-center">
        <h1 className="text-brutalist-h1 text-white mb-4">
          Fale com a IA
        </h1>
        <p className="text-brutalist-body text-gray max-w-xl mx-auto">
          Use o microfone para fazer perguntas. O Gemini responde em voz alta.
          Funciona no Chrome, Edge ou Safari.
        </p>
      </section>

      {/* Voice Assistant */}
      <section className="container-brutal pb-24">
        <div className="flex justify-center">
          <VoiceAssistant />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t-2 border-white/20">
        <div className="container-brutal py-12">
          <h2 className="text-brutalist-h2 text-white mb-8 text-center">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="border-2 border-white/20 p-6 text-center hover:border-neon-cyan transition-colors duration-100"
              >
                <span className="block text-4xl font-black text-neon-cyan mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-2">
                  {step.title}
                </h3>
                <p className="text-gray text-xs uppercase tracking-wider leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-white/20">
        <div className="container-brutal py-12 text-center">
          <p className="text-white text-sm font-bold uppercase tracking-wider mb-4">
            Quer ver outros componentes?
          </p>
          <BrutalistButton
            variant="cyan"
            size="lg"
            href="/demo"
          >
            Ver Design System Demo
          </BrutalistButton>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    title: "Fale",
    desc: "Clique em Falar e autorize o microfone. Sua voz será convertida em texto pela Web Speech API.",
  },
  {
    title: "Processe",
    desc: "O texto é enviado para o Gemini 1.5 Pro através da API route segura do servidor.",
  },
  {
    title: "Escute",
    desc: "A resposta da IA é lida em voz alta usando speechSynthesis, com voz em português do Brasil.",
  },
];
