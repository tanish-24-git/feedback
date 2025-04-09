import type React from "react"
import "./globals.css"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Feedback That Slaps</title>
        <meta name="description" content="Get feedback that truly slaps" />
      </head>
      <body className={orbitron.variable}>{children}</body>
    </html>
  )
}
