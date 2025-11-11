import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Smart CS - Crop Health Monitor",
  description: "Small Crop and Soil Detection System for monitoring plant and soil health",
  generator: "v0.app",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000204363.ico-vSlJmRQxJCfYZEXCz7BvItNuIlFMFm.x-icon",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000204363.ico-vSlJmRQxJCfYZEXCz7BvItNuIlFMFm.x-icon"
          type="image/x-icon"
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
