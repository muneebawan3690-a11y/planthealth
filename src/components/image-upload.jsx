"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Leaf, Droplet, Camera, AlertCircle, CheckCircle, Loader } from "lucide-react"

export default function ImageUpload({ isAuthenticated, onAnalysisComplete }) {
  const [cropImage, setCropImage] = useState(null)
  const [cropDescription, setCropDescription] = useState("")
  const [cropType, setCropType] = useState("")
  const [soilPH, setSoilPH] = useState("")
  const [soilMoisture, setSoilMoisture] = useState("")
  const [soilType, setSoilType] = useState("")
  const [soilTemperature, setSoilTemperature] = useState("")
  const [soilNitrogen, setSoilNitrogen] = useState("")
  const [soilPotassium, setSoilPotassium] = useState("")
  const [ndvi, setNdvi] = useState("")
  const [ndre, setNdre] = useState("")
  const [rgbDamageScore, setRgbDamageScore] = useState("")
  const [soilDescription, setSoilDescription] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (showCamera) {
      startCamera()
    } else {
      stopCamera()
    }
    return () => {
      stopCamera()
    }
  }, [showCamera])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        setCropImage(imageData)
        setShowCamera(false)
      }
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCropImage(event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (
      !cropImage ||
      !soilPH ||
      !soilMoisture ||
      !soilType ||
      !soilTemperature ||
      !cropType ||
      !soilNitrogen ||
      !soilPotassium ||
      !ndvi ||
      !ndre ||
      !rgbDamageScore
    ) {
      alert("Please upload a crop image and fill in all soil and crop parameters")
      return
    }

    if (!isAuthenticated) {
      alert("Please sign in to analyze crop and soil data")
      return
    }

    setIsLoading(true)
    setError(null)
    setAnalysisResult(null)

    try {
      const response = await fetch("/api/analyze-combined", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: cropImage,
          cropDescription,
          cropType,
          pH: soilPH,
          moisture: soilMoisture,
          temperature: soilTemperature,
          soilType,
          nitrogen: soilNitrogen,
          potassium: soilPotassium,
          ndvi,
          ndre,
          rgbDamageScore,
          soilDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze crop and soil data")
      }

      const result = await response.json()
      setAnalysisResult(result)

      if (onAnalysisComplete) {
        onAnalysisComplete(result, {
          soilPH: Number.parseFloat(soilPH),
          soilMoisture: Number.parseFloat(soilMoisture),
          soilTemperature: Number.parseFloat(soilTemperature),
          soilNitrogen: Number.parseFloat(soilNitrogen),
          soilPotassium: Number.parseFloat(soilPotassium),
          ndvi: Number.parseFloat(ndvi),
          ndre: Number.parseFloat(ndre),
          rgbDamageScore: Number.parseFloat(rgbDamageScore),
        })
      }
    } catch (err) {
      console.error("[v0] Combined analysis failed:", err)
      setError("Failed to analyze data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary mb-4 animate-fadeInUp">Upload Your Crop Image</h2>
        <p className="text-center text-foreground/70 mb-16 text-lg">
          Get instant AI-powered analysis combining crop health and soil conditions for comprehensive recommendations
        </p>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors animate-slideInLeft">
          {/* Crop Upload Section */}
          <div className="mb-8 pb-8 border-b border-primary/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Crop Analysis</h3>
              <p className="text-foreground/70">Upload crop image for disease detection</p>
            </div>

            {showCamera ? (
              <div className="mb-6">
                <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Capture Photo
                  </button>
                  <button
                    onClick={() => setShowCamera(false)}
                    className="flex-1 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : cropImage ? (
              <div className="mb-6">
                <img
                  src={cropImage || "/placeholder.svg"}
                  alt="Crop"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setCropImage(null)}
                    className="flex-1 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={() => setShowCamera(true)}
                    className="flex-1 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Camera
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 space-y-3">
                <label className="block cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-8 hover:bg-primary/5 rounded-lg transition-colors">
                    <Upload className="w-12 h-12 text-primary mb-3" />
                    <span className="text-primary font-semibold">Click to upload</span>
                    <span className="text-foreground/60 text-sm">or drag and drop</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full py-3 border-2 border-primary rounded-lg text-primary font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Take Live Photo
                </button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background font-medium"
              >
                <option value="">Select Crop Type</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
                <option value="Soybean">Soybean</option>
                <option value="Cotton">Cotton</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Potato">Potato</option>
                <option value="Tomato">Tomato</option>
                <option value="Corn">Corn</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                placeholder="NDVI (-1 to 1)"
                value={ndvi}
                onChange={(e) => setNdvi(e.target.value)}
                min="-1"
                max="1"
                step="0.01"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <input
                type="number"
                placeholder="NDRE (-1 to 1)"
                value={ndre}
                onChange={(e) => setNdre(e.target.value)}
                min="-1"
                max="1"
                step="0.01"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <input
                type="number"
                placeholder="RGB Damage Score (0-100)"
                value={rgbDamageScore}
                onChange={(e) => setRgbDamageScore(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
            </div>

            <textarea
              placeholder="Describe your crop condition (optional)"
              value={cropDescription}
              onChange={(e) => setCropDescription(e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-background"
              rows={2}
            />
          </div>

          {/* Soil Input Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Soil Analysis</h3>
              <p className="text-foreground/70">Enter soil properties for integrated analysis</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Soil pH (0-14)"
                value={soilPH}
                onChange={(e) => setSoilPH(e.target.value)}
                min="0"
                max="14"
                step="0.1"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
              />
              <input
                type="number"
                placeholder="Moisture Level (%)"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
              />
              <input
                type="number"
                placeholder="Temperature (°C)"
                value={soilTemperature}
                onChange={(e) => setSoilTemperature(e.target.value)}
                step="0.1"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
              />
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
              >
                <option value="">Select Soil Type</option>
                <option value="Sandy">Sandy</option>
                <option value="Loamy">Loamy</option>
                <option value="Clay">Clay</option>
                <option value="Silty">Silty</option>
                <option value="Peaty">Peaty</option>
              </select>
              <input
                type="number"
                placeholder="Nitrogen (mg/kg)"
                value={soilNitrogen}
                onChange={(e) => setSoilNitrogen(e.target.value)}
                min="0"
                step="0.1"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
              />
              <input
                type="number"
                placeholder="Potassium (mg/kg)"
                value={soilPotassium}
                onChange={(e) => setSoilPotassium(e.target.value)}
                min="0"
                step="0.1"
                className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
              />
            </div>

            <textarea
              placeholder="Describe your soil condition (optional)"
              value={soilDescription}
              onChange={(e) => setSoilDescription(e.target.value)}
              className="w-full p-3 border border-border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-secondary resize-none bg-background"
              rows={2}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={
              !cropImage ||
              !soilPH ||
              !soilMoisture ||
              !soilType ||
              !soilTemperature ||
              !cropType ||
              !soilNitrogen ||
              !soilPotassium ||
              !ndvi ||
              !ndre ||
              !rgbDamageScore ||
              isLoading
            }
            className="w-full px-6 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing Crop & Soil...
              </>
            ) : (
              "Analyze Crop & Soil Together"
            )}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {analysisResult && (
            <div className="mt-8 space-y-6 animate-grow">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-bold text-green-800">Complete Analysis</p>
                </div>
              </div>

              {/* Crop Analysis Results */}
              <div className="bg-white rounded-lg border border-primary/20 p-6 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Leaf className="w-6 h-6" /> Crop Health
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Crop Type:</span>{" "}
                      {analysisResult.cropAnalysis.cropType}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Disease/Status:</span>{" "}
                      {analysisResult.cropAnalysis.disease}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Confidence:</span>{" "}
                      {analysisResult.cropAnalysis.confidence}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Urgency:</span>
                      <span
                        className={`ml-2 font-bold ${
                          analysisResult.cropAnalysis.urgency === "Critical"
                            ? "text-red-600"
                            : analysisResult.cropAnalysis.urgency === "High"
                              ? "text-orange-600"
                              : analysisResult.cropAnalysis.urgency === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                        }`}
                      >
                        {analysisResult.cropAnalysis.urgency}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">NDVI:</span> {analysisResult.cropAnalysis.ndvi}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">NDRE:</span> {analysisResult.cropAnalysis.ndre}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">RGB Damage Score:</span>{" "}
                      {analysisResult.cropAnalysis.rgbDamageScore}
                    </p>
                  </div>
                </div>

                {analysisResult.cropAnalysis.symptoms.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Symptoms Detected:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.cropAnalysis.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-gray-600">
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.cropAnalysis.treatment.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Treatment Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.cropAnalysis.treatment.map((rec, idx) => (
                        <li key={idx} className="text-gray-600">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.cropAnalysis.prevention.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Prevention Tips:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.cropAnalysis.prevention.map((tip, idx) => (
                        <li key={idx} className="text-gray-600">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Soil Analysis Results */}
              <div className="bg-white rounded-lg border border-secondary/20 p-6 space-y-4">
                <h4 className="text-xl font-bold text-secondary flex items-center gap-2">
                  <Droplet className="w-6 h-6" /> Soil Health
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">pH Status:</span>{" "}
                      {analysisResult.soilAnalysis.phStatus}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Temperature:</span>{" "}
                      {analysisResult.soilAnalysis.temperatureStatus}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Moisture:</span>{" "}
                      {analysisResult.soilAnalysis.moistureStatus}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-gray-700">Overall Health:</span>{" "}
                      {analysisResult.soilAnalysis.soilHealth}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-700 mb-2">Nutrient Levels:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-medium text-gray-700 text-sm">Nitrogen</p>
                      <p className="text-green-600 font-semibold">{analysisResult.soilAnalysis.nutrients.nitrogen}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-medium text-gray-700 text-sm">Phosphorus</p>
                      <p className="text-green-600 font-semibold">{analysisResult.soilAnalysis.nutrients.phosphorus}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-medium text-gray-700 text-sm">Potassium</p>
                      <p className="text-green-600 font-semibold">{analysisResult.soilAnalysis.nutrients.potassium}</p>
                    </div>
                  </div>
                </div>

                {analysisResult.soilAnalysis.suitableCrops.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Best Crops for This Soil:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.soilAnalysis.suitableCrops.map((crop, idx) => (
                        <li key={idx} className="text-gray-600">
                          {crop}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.soilAnalysis.recommendations.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2">Soil Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.soilAnalysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-gray-600">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Integrated Recommendations */}
              {analysisResult.integratedRecommendations.length > 0 && (
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/30 p-6 space-y-3">
                  <h4 className="text-xl font-bold text-primary">Integrated Recommendations</h4>
                  <p className="text-gray-700 text-sm mb-4">
                    Based on your crop and soil analysis, here are actionable recommendations:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    {analysisResult.integratedRecommendations.map((rec, idx) => (
                      <li key={idx} className="text-gray-700 font-medium">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
