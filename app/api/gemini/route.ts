import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, contextData } = body;

    const systemInstruction = `You are WatchKit AI, an expert web analyst and conversion rate optimizer.
You analyze web traffic metrics, identify page friction points and conversion drop-offs, and provide high-impact, actionable suggestions.
Format your response in sleek, scannable Markdown with clean bullet points.
Reference specific page paths (like /home, /pricing, /features) and metric changes in your evaluation.
Be direct, professional, friendly, and objective.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Context Data:
${JSON.stringify(contextData, null, 2)}

User Prompt/Question:
${prompt || "Provide a summary analysis of our current top-performing pages and point out the biggest bottlenecks."}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate AI analytics insights." },
      { status: 500 }
    );
  }
}
