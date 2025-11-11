"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function Dashboard({
  analysisResult,
  soilPH,
  soilMoisture,
  soilTemperature,
  soilNitrogen,
  soilPotassium,
  ndvi,
  ndre,
  rgbDamageScore,
}) {
  const defaultCropHealthData = [
    { name: "Tomato", health: 85, disease: 15 },
    { name: "Wheat", health: 92, disease: 8 },
    { name: "Corn", health: 78, disease: 22 },
    { name: "Rice", health: 88, disease: 12 },
    { name: "Potato", health: 81, disease: 19 },
  ]

  const defaultSoilHealthData = [
    { month: "Jan", pH: 6.8, nitrogen: 45, phosphorus: 32 },
    { month: "Feb", pH: 6.9, nitrogen: 48, phosphorus: 35 },
    { month: "Mar", pH: 7.0, nitrogen: 52, phosphorus: 38 },
    { month: "Apr", pH: 6.95, nitrogen: 55, phosphorus: 40 },
    { month: "May", pH: 7.1, nitrogen: 58, phosphorus: 42 },
    { month: "Jun", pH: 7.05, nitrogen: 60, phosphorus: 45 },
  ]

  const defaultSensorData = [
    { name: "Temperature", value: 28, color: "#2d7a4a" },
    { name: "Humidity", value: 65, color: "#8b6f47" },
    { name: "Moisture", value: 42, color: "#1f5a38" },
  ]

  const getCropHealthData = () => {
    if (!analysisResult) return defaultCropHealthData

    const damageScore = parseFloat(rgbDamageScore?.toString() || "0")
    const healthScore = Math.max(0, 100 - damageScore)

    return [
      {
        name: analysisResult.cropAnalysis?.cropType || "Current Crop",
        health: healthScore,
        disease: damageScore,
      },
    ]
  }

  const getSoilHealthData = () => {
    if (!analysisResult || !soilPH) return defaultSoilHealthData

    const nitrogenVal = parseFloat(soilNitrogen?.toString() || "45")
    const potassiumVal = parseFloat(soilPotassium?.toString() || "32")

    return [
      {
        month: "Current",
        pH: parseFloat(soilPH.toString()),
        nitrogen: nitrogenVal,
        phosphorus: potassiumVal,
      },
    ]
  }

  const getSensorData = () => {
    if (!analysisResult) return defaultSensorData

    const tempVal = parseFloat(soilTemperature?.toString() || "28")
    const moistureVal = parseFloat(soilMoisture?.toString() || "42")
    const ndviVal = (parseFloat(ndvi?.toString() || "0") + 1) * 50 // Convert -1 to 1 scale to 0–100

    return [
      { name: "Temperature", value: tempVal, color: "#2d7a4a" },
      { name: "Moisture", value: moistureVal, color: "#8b6f47" },
      { name: "NDVI Index", value: Math.min(100, Math.max(0, ndviVal)), color: "#1f5a38" },
    ]
  }

  const cropHealthData = getCropHealthData()
  const soilHealthData = getSoilHealthData()
  const sensorData = getSensorData()

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary mb-16 animate-fadeInUp">
          Real-Time Monitoring Dashboard
        </h2>

        {analysisResult && (
          <div className="mb-8 p-4 bg-green-50 border-l-4 border-primary rounded-lg animate-slideInLeft">
            <p className="text-primary font-semibold">✓ Analysis Complete! Dashboard updated with your results</p>
          </div>
        )}

        {/* Crop Health Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-border animate-slideInLeft">
          <h3 className="text-2xl font-bold text-primary mb-6">Crop Health Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e8dc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#f5faf7", border: "1px solid #d4e8dc" }}
                labelStyle={{ color: "#1a3a2a" }}
              />
              <Legend />
              <Bar dataKey="health" fill="#2d7a4a" name="Health %" />
              <Bar dataKey="disease" fill="#8b6f47" name="Disease Risk %" />
            </BarChart>
          </ResponsiveContainer>
          {analysisResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-primary">
                Disease Status: {analysisResult.cropAnalysis.disease}
              </p>
              <p className="text-sm text-gray-600">Urgency Level: {analysisResult.cropAnalysis.urgency}</p>
            </div>
          )}
        </div>

        {/* Soil Nutrients Trend */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-border animate-slideInRight">
          <h3 className="text-2xl font-bold text-primary mb-6">Soil Nutrients Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={soilHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4e8dc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#f5faf7", border: "1px solid #d4e8dc" }}
                labelStyle={{ color: "#1a3a2a" }}
              />
              <Legend />
              <Line type="monotone" dataKey="nitrogen" stroke="#2d7a4a" strokeWidth={2} name="Nitrogen (ppm)" />
              <Line type="monotone" dataKey="phosphorus" stroke="#8b6f47" strokeWidth={2} name="Potassium (ppm)" />
            </LineChart>
          </ResponsiveContainer>
          {analysisResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-primary">
                Soil Health: {analysisResult.soilAnalysis.soilHealth}
              </p>
              <p className="text-sm text-gray-600">pH Status: {analysisResult.soilAnalysis.phStatus}</p>
            </div>
          )}
        </div>

        {/* Sensor Data */}
        <div className="grid md:grid-cols-3 gap-8">
          {sensorData.map((sensor, index) => (
            <div
              key={sensor.name}
              className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold text-primary mb-4">{sensor.name}</h3>
              <div className="flex items-center justify-between mb-6">
                <div className="text-5xl font-bold text-primary">{sensor.value.toFixed(1)}</div>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${sensor.color}20` }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${sensor.color}40` }}
                  >
                    <span className="text-2xl font-bold" style={{ color: sensor.color }}>
                      {sensor.value.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, sensor.value)}%`, backgroundColor: sensor.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
