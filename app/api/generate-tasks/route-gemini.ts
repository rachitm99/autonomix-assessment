import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an AI assistant that analyzes meeting transcripts and extracts actionable tasks. 
For each task, you must:
1. Identify clear, specific action items
2. Assign a priority level (high, medium, or low) based on:
   - High: Critical blockers, deadlines within a week, P0 issues
   - Medium: Important but not urgent, standard work items
   - Low: Nice-to-haves, future considerations, backlog items
3. Keep each task concise and clear

Return the tasks as a JSON array with this exact format:
[
  {
    "text": "Task description",
    "priority": "high" | "medium" | "low"
  }
]

Only return the JSON array, no additional text.

Meeting Transcript:
${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Parse the JSON response
    const tasks = JSON.parse(content);

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error generating tasks:", error);
    return NextResponse.json(
      { error: "Failed to generate tasks" },
      { status: 500 }
    );
  }
}
