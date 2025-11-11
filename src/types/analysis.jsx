// Default CombinedAnalysis object
const defaultCombinedAnalysis = {
  cropAnalysis: {
    disease: "",
    confidence: "",
    symptoms: [],
    treatment: [],
    prevention: [],
    urgency: "",
    cropType: "",
    ndvi: "",
    ndre: "",
    rgbDamageScore: ""
  },
  soilAnalysis: {
    phStatus: "",
    temperatureStatus: "",
    moistureStatus: "",
    soilHealth: "",
    recommendations: [],
    suitableCrops: [],
    nutrients: {
      nitrogen: "",
      phosphorus: "",
      potassium: ""
    }
  },
  integratedRecommendations: []
}

// Example usage with React useState
import React, { useState } from "react";

export default function ExampleComponent() {
  const [analysisResult, setAnalysisResult] = useState(defaultCombinedAnalysis);

  // You can now update analysisResult dynamically
  const updateAnalysis = () => {
    setAnalysisResult({
      ...analysisResult,
      cropAnalysis: { ...analysisResult.cropAnalysis, disease: "Powdery Mildew" }
    });
  };

  return (
    <div>
      <h1>Crop Disease: {analysisResult.cropAnalysis.disease}</h1>
      <button onClick={updateAnalysis}>Update Disease</button>
    </div>
  );
}
