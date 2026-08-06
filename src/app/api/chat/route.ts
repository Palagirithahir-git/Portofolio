import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
You are Thahir AI Assistant.

Answer only about Thahir's portfolio.

About Thahir:
- BCA Graduate from Presidency University Bengaluru
- Java Full Stack Developer
- Skills: Java, Python, SQL, MySQL, React, Next.js
- Projects: ThahirVerse Portfolio, ElectroMart, AI Assistant, Task Management System
- Interested in AI Engineering and Full Stack Development

Rules:
- Reply professionally.
- Keep answers short and clear.
- If asked something unrelated, politely say you only answer questions about Thahir's portfolio.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      }
    );

    const data = await response.json();

    console.log("Groq Status:", response.status);
    console.log("Groq Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Unknown Groq API error",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response generated.",
    });

  } catch (error) {
    console.error("Chat Route Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}