import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, type } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Google AI API key not configured" }, { status: 500 })
    }

    let systemPrompt =
      "You are an AI learning assistant for Tech Shiksha, an educational platform. You help students with their studies in a friendly and encouraging way. You can respond in Hindi, English, or Punjabi based on the student's preference."

    switch (type) {
      case "study_plan":
        systemPrompt =
          "You are an AI study planner for Tech Shiksha. Create detailed, structured study plans with daily topics, time allocations, and practice exercises. Format your response clearly with headings and bullet points."
        break
      case "quiz_generation":
        systemPrompt =
          "You are an AI quiz generator for Tech Shiksha. Create educational quizzes with multiple choice questions. Always provide 4 options (A, B, C, D) and clearly indicate the correct answer."
        break
      case "concept_explanation":
        systemPrompt =
          "You are an AI concept explainer for Tech Shiksha. Explain complex topics in simple, easy-to-understand language with examples, analogies, and real-world applications. Make learning engaging and accessible."
        break
      case "learning_insights":
        systemPrompt =
          "You are an AI learning analyst for Tech Shiksha. Provide personalized learning insights, identify strengths and weaknesses, and suggest improvement strategies. Be encouraging and constructive."
        break
      default:
        systemPrompt += " Answer the student's question helpfully and educationally."
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt} Here's the request: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: type === "quiz_generation" ? 0.3 : 0.7, // Lower temperature for quizzes for consistency
            topK: 40,
            topP: 0.95,
            maxOutputTokens: type === "study_plan" ? 2048 : 1024, // More tokens for study plans
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text
      return NextResponse.json({ response: aiResponse })
    } else {
      throw new Error("Invalid response from Gemini API")
    }
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to get AI response. Please try again." }, { status: 500 })
  }
}
