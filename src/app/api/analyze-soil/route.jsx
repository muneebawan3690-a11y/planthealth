import { generateObject } from "ai"
import { z } from "zod"

const soilAnalysisSchema = z.object({
  phStatus: z.string().describe("pH classification: Acidic, Neutral, or Alkaline"),
  temperatureStatus: z.string().describe("Temperature classification: Cold, Moderate, or Warm"),
  moistureStatus: z.string().describe("Moisture level: Too Dry, Adequate, or Too Wet"),
  soilHealth: z.string().describe("Overall soil health assessment"),
  recommendations: z.array(z.string()).describe("Specific recommendations for improvement"),
  suitableCrops: z.array(z.string()).describe("Best crops for this soil condition"),
  nutrients: z
    .object({
      nitrogen: z.string(),
      phosphorus: z.string(),
      potassium: z.string(),
    })
    .describe("Estimated nutrient levels"),
})

export async function POST(req) {
  try {
    const { pH, moisture, temperature, soilType, description } = await req.json()

    const contextDescription = description || "Standard soil analysis"

    const prompt = `Analyze this soil with the following properties:
- pH Level: ${pH} (${Number(pH) > 7 ? "Alkaline" : Number(pH) < 7 ? "Acidic" : "Neutral"})
- Moisture Level: ${moisture}%
- Temperature: ${temperature}°C
- Soil Type: ${soilType}
- Additional Notes: ${contextDescription}

Provide detailed analysis including:
1. Soil health assessment
2. Nutrient level estimates
3. Suitable crops for this soil
4. Specific recommendations to improve soil quality
5. Any concerns or issues to address`

    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: soilAnalysisSchema,
      prompt,
      temperature: 0.7,
      maxOutputTokens: 1024,
    })

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Soil analysis error:", error)
    return Response.json({ error: "Failed to analyze soil data" }, { status: 500 })
  }
}
