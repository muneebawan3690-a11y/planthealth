"use client"

export default function Hero() {
  return (
    <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideInLeft">
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Monitor Your Crops & Soil Health
            </h2>
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
              Smart CS uses advanced AI and IoT sensors to detect crop diseases and soil conditions in real-time. Get
              actionable insights to maximize your harvest.
            </p>
          </div>

          {/* Right Graphics */}
          <div className="relative h-96 animate-slideInRight">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl" />
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Plant illustration */}
              <circle cx="200" cy="300" r="80" fill="#8b6f47" opacity="0.3" />
              <path d="M200 300 Q180 200 200 100" stroke="#2d7a4a" strokeWidth="8" fill="none" />
              <ellipse cx="160" cy="180" rx="40" ry="60" fill="#1f5a38" opacity="0.7" />
              <ellipse cx="240" cy="160" rx="40" ry="60" fill="#2d7a4a" opacity="0.7" />
              <ellipse cx="200" cy="140" rx="35" ry="50" fill="#4a9d6f" opacity="0.8" />
              {/* Soil layers */}
              <rect x="80" y="320" width="240" height="20" fill="#8b6f47" opacity="0.6" />
              <rect x="80" y="340" width="240" height="20" fill="#6b5d3f" opacity="0.7" />
              <rect x="80" y="360" width="240" height="20" fill="#5a4a2f" opacity="0.8" />
              {/* Water droplets */}
              <circle cx="120" cy="250" r="8" fill="#4a90e2" opacity="0.6" />
              <circle cx="280" cy="270" r="8" fill="#4a90e2" opacity="0.6" />
              <circle cx="200" cy="280" r="8" fill="#4a90e2" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
