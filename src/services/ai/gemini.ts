/**
 * Gemini AI Service (Client-side)
 *
 * Sends prompts to the secure server-side API route (/api/gemini)
 * instead of calling Google directly — the API key stays on the server.
 *
 * Usage:
 *   import { askGemini } from '@/services/ai/gemini';
 *   const reply = await askGemini('Qual é a capital do Brasil?');
 */

// ── Types ──
interface GeminiResponse {
  text: string;
  error?: undefined;
}

interface GeminiError {
  text?: undefined;
  error: string;
}

type Result = GeminiResponse | GeminiError;

/**
 * Send a single text prompt to Gemini via the internal API.
 * Returns { text } on success or { error } on failure — never throws.
 */
export async function askGemini(prompt: string): Promise<Result> {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || `Erro HTTP ${res.status}` };
    }

    return { text: data.text };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro de conexão com o servidor";
    console.error("[Gemini Service] Error:", message);
    return { error: message };
  }
}

/**
 * Send a prompt with chat history context for multi-turn conversations.
 */
export async function askGeminiWithHistory(
  prompt: string,
  history: { role: "user" | "model"; text: string }[]
): Promise<Result> {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, history }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || `Erro HTTP ${res.status}` };
    }

    return { text: data.text };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro de conexão com o servidor";
    console.error("[Gemini Service] Chat Error:", message);
    return { error: message };
  }
}

export default askGemini;
