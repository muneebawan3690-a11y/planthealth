"use client"

export default function HealthDescription() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary mb-16">Understanding Plant & Soil Health</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Plant Health */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow animate-fadeInUp">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 shadow-md">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Plant Health</h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Monitor leaf color, texture, and growth patterns. Our AI detects early signs of diseases like powdery
              mildew, leaf spots, and nutrient deficiencies. Early detection means better treatment outcomes and higher
              yields.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/70">Disease Detection</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/70">Nutrient Analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground/70">Growth Tracking</span>
              </li>
            </ul>
          </div>

          {/* Soil Health */}
          <div
            className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center mb-6 shadow-md">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Soil Health</h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Analyze soil composition, pH levels, moisture content, and nutrient balance. Healthy soil is the
              foundation of healthy crops. Our sensors provide real-time data to optimize irrigation and fertilization.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/70">pH & Nutrient Levels</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/70">Moisture Monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground/70">Composition Analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
