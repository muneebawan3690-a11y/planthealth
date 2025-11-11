export async function POST(request) {
  try {
    const {
      imageBase64,
      cropDescription,
      cropType,
      pH,
      moisture,
      temperature,
      soilType,
      nitrogen,
      potassium,
      ndvi,
      ndre,
      rgbDamageScore,
      soilDescription,
    } = await request.json()

    console.log("[v0] Received analysis request with crop type:", cropType)

    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      console.error("[v0] Missing OPENAI_API_KEY environment variable")
      return Response.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    const cropPrompt = `You are an agricultural expert AI. Analyze this crop image and provide a structured JSON response with the following format (ONLY valid JSON, no markdown):
{
  "cropType": "${cropType}",
  "disease": "disease name or healthy status",
  "confidence": "percentage or confidence level",
  "urgency": "Critical/High/Medium/Low",
  "ndvi": "${ndvi}",
  "ndre": "${ndre}",
  "rgbDamageScore": "${rgbDamageScore}",
  "symptoms": ["symptom1", "symptom2"],
  "treatment": ["treatment1", "treatment2"],
  "prevention": ["prevention1", "prevention2"]
}

Crop Description: ${cropDescription || "None"}
Additional Context: This is a ${cropType} crop with NDVI: ${ndvi}, NDRE: ${ndre}, RGB Damage Score: ${rgbDamageScore}`

    const soilPrompt = `You are an agricultural soil expert. Based on the following soil parameters, provide a structured JSON response with the following format (ONLY valid JSON, no markdown):
{
  "phStatus": "status based on pH value",
  "temperatureStatus": "status based on temperature",
  "moistureStatus": "status based on moisture percentage",
  "soilHealth": "overall assessment",
  "nutrients": {
    "nitrogen": "status",
    "phosphorus": "status",
    "potassium": "status"
  },
  "suitableCrops": ["crop1", "crop2", "crop3"],
  "recommendations": ["recommendation1", "recommendation2"]
}

Soil Parameters:
- pH Level: ${pH}
- Moisture: ${moisture}%
- Temperature: ${temperature}°C
- Soil Type: ${soilType}
- Nitrogen: ${nitrogen} mg/kg
- Potassium: ${potassium} mg/kg
- Description: ${soilDescription || "None"}`

    console.log("[v0] Sending crop image to OpenAI for analysis")
    const cropResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: cropPrompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    })

    if (!cropResponse.ok) {
      const error = await cropResponse.json()
      console.error("[v0] OpenAI crop analysis error:", error)
      throw new Error("Failed to analyze crop image")
    }

    const cropData = await cropResponse.json()
    console.log("[v0] Crop analysis received")

    let cropAnalysis
    try {
      const cropContent = cropData.choices[0]?.message?.content || ""
      // Extract JSON from response (in case of markdown formatting)
      const jsonMatch = cropContent.match(/\{[\s\S]*\}/)
      cropAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(cropContent)
    } catch (e) {
      console.error("[v0] Failed to parse crop analysis JSON:", e)
      cropAnalysis = {
        cropType,
        disease: "Unable to determine",
        confidence: "Low",
        urgency: "Medium",
        ndvi,
        ndre,
        rgbDamageScore,
        symptoms: ["Analysis pending"],
        treatment: ["Please consult an agronomist"],
        prevention: ["Regular monitoring recommended"],
      }
    }

    console.log("[v0] Sending soil parameters to OpenAI for analysis")
    const soilResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: soilPrompt,
          },
        ],
        max_tokens: 500,
      }),
    })

    if (!soilResponse.ok) {
      const error = await soilResponse.json()
      console.error("[v0] OpenAI soil analysis error:", error)
      throw new Error("Failed to analyze soil data")
    }

    const soilData = await soilResponse.json()
    console.log("[v0] Soil analysis received")

    let soilAnalysis
    try {
      const soilContent = soilData.choices[0]?.message?.content || ""
      // Extract JSON from response (in case of markdown formatting)
      const jsonMatch = soilContent.match(/\{[\s\S]*\}/)
      soilAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(soilContent)
    } catch (e) {
      console.error("[v0] Failed to parse soil analysis JSON:", e)
      soilAnalysis = {
        phStatus: "Neutral",
        temperatureStatus: "Moderate",
        moistureStatus: "Adequate",
        soilHealth: "Good",
        nutrients: {
          nitrogen: "Moderate",
          phosphorus: "Moderate",
          potassium: "Moderate",
        },
        suitableCrops: ["Wheat", "Rice", "Maize"],
        recommendations: ["Maintain current soil conditions", "Regular monitoring advised"],
      }
    }

    const integratedPrompt = `Based on this crop analysis: ${JSON.stringify(cropAnalysis)} and soil analysis: ${JSON.stringify(soilAnalysis)}, provide 3-4 integrated recommendations as a JSON array of strings. Return ONLY the JSON array, no markdown or extra text.`

    const integratedResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: integratedPrompt,
          },
        ],
        max_tokens: 300,
      }),
    })

    let integratedRecommendations = []
    if (integratedResponse.ok) {
      const integratedData = await integratedResponse.json()
      try {
        const integratedContent = integratedData.choices[0]?.message?.content || "[]"
        const arrayMatch = integratedContent.match(/\[[\s\S]*\]/)
        integratedRecommendations = arrayMatch ? JSON.parse(arrayMatch[0]) : JSON.parse(integratedContent)
      } catch (e) {
        console.error("[v0] Failed to parse integrated recommendations:", e)
        integratedRecommendations = [
          "Monitor crop and soil conditions regularly",
          "Adjust watering based on moisture levels",
          "Apply appropriate nutrients based on soil analysis",
        ]
      }
    }

    console.log("[v0] Combined analysis completed successfully")
    return Response.json({
      cropAnalysis,
      soilAnalysis,
      integratedRecommendations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Analysis error:", error)
    return Response.json({ error: error.message || "Failed to analyze crop and soil data" }, { status: 500 })
  }
}
