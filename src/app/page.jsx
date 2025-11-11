"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import HealthDescription from "@/components/health-description"
import ImageUpload from "@/components/image-upload"
import Dashboard from "@/components/dashboard"
import Footer from "@/components/footer"
import AuthModal from "@/components/auth-modal"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [userName, setUserName] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisParams, setAnalysisParams] = useState({
    soilPH: 0,
    soilMoisture: 0,
    soilTemperature: 0,
    soilNitrogen: 0,
    soilPotassium: 0,
    ndvi: 0,
    ndre: 0,
    rgbDamageScore: 0,
  })

  const handleAuthSuccess = (name) => {
    setIsAuthenticated(true)
    setUserName(name)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserName("")
  }

  const handleAnalysisComplete = (result, params) => {
    setAnalysisResult(result)
    setAnalysisParams(params)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={handleLogout}
        onLoginClick={() => setShowAuthModal(true)}
      />

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuthSuccess={handleAuthSuccess} />}

      {isAuthenticated && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-4 text-center animate-fadeInUp">
          <p className="text-lg font-semibold text-primary">Welcome back, {userName}! 🌱</p>
        </div>
      )}

      <Hero onGetStarted={() => setShowAuthModal(!isAuthenticated)} />
      <HealthDescription />
      <ImageUpload isAuthenticated={isAuthenticated} onAnalysisComplete={handleAnalysisComplete} />
      <Dashboard
        analysisResult={analysisResult}
        soilPH={analysisParams.soilPH}
        soilMoisture={analysisParams.soilMoisture}
        soilTemperature={analysisParams.soilTemperature}
        soilNitrogen={analysisParams.soilNitrogen}
        soilPotassium={analysisParams.soilPotassium}
        ndvi={analysisParams.ndvi}
        ndre={analysisParams.ndre}
        rgbDamageScore={analysisParams.rgbDamageScore}
      />
      <Footer />
    </main>
  )
}
