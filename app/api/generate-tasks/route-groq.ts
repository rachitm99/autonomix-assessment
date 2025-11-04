import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant that analyzes meeting transcripts and extracts actionable tasks. 
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

Only return the JSON array, no additional text.`,
          },
          {
            role: "user",
            content: transcript,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error("Groq API request failed");
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

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
