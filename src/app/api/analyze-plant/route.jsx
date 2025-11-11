import { generateObject } from "ai"
import { z } from "zod"

const plantAnalysisSchema = z.object({
  disease: z.string().describe("Name of the detected plant disease or health status"),
  confidence: z.string().describe("Confidence level: High, Medium, or Low"),
  symptoms: z.array(z.string()).describe("Visible symptoms detected"),
  treatment: z.array(z.string()).describe("Recommended treatment methods"),
  prevention: z.array(z.string()).describe("Prevention tips"),
  urgency: z.string().describe("Urgency level: Critical, High, Medium, or Low"),
})

export async function POST(req) {
  try {
    const { imageBase64, description } = await req.json()

    const prompt = description
      ? `Analyze this plant image. Additional info: ${description}. Provide disease diagnosis, treatment, and prevention.`
      : "Analyze this plant image for diseases, health issues, or abnormalities. Provide detailed diagnosis and recommendations."

    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: plantAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image",
              image: imageBase64,
              mediaType: "image/jpeg",
            },
          ],
        },
      ],
      temperature: 0.7,
      maxOutputTokens: 1024,
    })

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Plant analysis error:", error)
    return Response.json({ error: "Failed to analyze plant image" }, { status: 500 })
  }
}
