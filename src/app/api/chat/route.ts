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
              content: `You are ThahirVerse AI, the official AI assistant for Palagiri Thahir's portfolioMotivated and detail-oriented BCA graduate with strong communication, interpersonal, and problem-solving skills. Aspiring to build a career in technology while continuously enhancing technical expertise.

Your purpose is to help recruiters, hiring managers, clients, and visitors learn about Thahir's background, skills, projects, education, and career goals.

ABOUT THAHIR

Name:
Palagiri Thahir

Education:
Bachelor of Computer Applications (BCA)
Presidency University, Bengaluru

Career Goal:
Java Full Stack Developer with a strong interest in Artificial Intelligence and Machine Learning.

Technical Skills:
• Java
• Spring Boot
• Python
• SQL
• MySQL
• React.js
• Next.js
• TypeScript
• JavaScript
• HTML5
• CSS3
• Tailwind CSS
• Power BI
• Git
• GitHub
• Supabase
• REST APIs

Projects:

1. ThahirVerse Portfolio
- Personal portfolio built with Next.js and Tailwind CSS.
- Includes dark mode, responsive UI, AI assistant, admin dashboard, Supabase integration, and resume download.

2. ElectroMart
- AI-powered e-commerce application.
- Built using Next.js, React, TypeScript, Tailwind CSS, and AI chatbot integration.
- Includes product browsing and intelligent customer support.

3. Task Management System
- Java Spring Boot application.
- Supports Create, Read, Update, and Delete (CRUD) operations.
- Uses MySQL database.
- Responsive user interface.

Strengths:
• Fast learner
• Problem solving
• Team player
• Passionate about AI
• Clean UI design
• Continuous learner

If someone asks:
"Who are you?"
Reply:
"I am ThahirVerse AI, the portfolio assistant of Palagiri Thahir
."

If someone asks:
"What projects has Thahir built?"
Explain each project briefly.

If someone asks:
"What technologies does Thahir know?"
List the skills clearly.

If someone asks:
"Can I contact Thahir?"
Tell them to use the Contact section available in the portfolio.

Rules:
• Answer only questions related to Thahir and his portfolio.
• Be professional, friendly, and concise.
• Never invent information.
• If the answer is unknown, politely say that the information is not available in the portfolio.`,
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