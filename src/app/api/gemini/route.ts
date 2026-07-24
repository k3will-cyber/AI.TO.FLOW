/**
 * Gemini API Route (Server-side)
 *
 * Secure proxy between the frontend and Google Gemini API.
 * The API key lives ONLY on the server (GEMINI_API_KEY env var).
 *
 * POST /api/gemini
 *   Body: { prompt: string, history?: { role: 'user' | 'model', text: string }[] }
 *   Response: { text: string } | { error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    // Read API key from SERVER-SIDE env (NOT exposed to client)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY não configurada no servidor." },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { prompt, history } = body as {
      prompt?: string;
      history?: { role: "user" | "model"; text: string }[];
    };

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Campo 'prompt' é obrigatório." },
        { status: 400 }
      );
    }

    // Initialize Gemini (server-side only)
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-pro";

    // Send prompt with or without chat history
    if (history && Array.isArray(history) && history.length > 0) {
      const chat = genAI
        .getGenerativeModel({ model: modelName })
        .startChat({
          history: history.map((h) => ({
            role: h.role,
            parts: [{ text: h.text }],
          })),
        });

      const result = await chat.sendMessage(prompt);
      const text = result.response.text();
      return NextResponse.json({ text });
    }

    // Simple single-turn prompt
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro interno do servidor";
    console.error("[API /api/gemini] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
