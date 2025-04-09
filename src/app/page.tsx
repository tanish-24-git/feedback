"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const cursorTrailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.left = `${e.clientX}px`
        cursorTrailRef.current.style.top = `${e.clientY}px`

        // Change color randomly
        const colors = ["#00D4FF", "#FF00E5", "#39FF14"]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        cursorTrailRef.current.style.background = randomColor
        cursorTrailRef.current.style.boxShadow = `0 0 10px ${randomColor}`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div ref={cursorTrailRef} className="cursor-trail"></div>

      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-cover bg-center"></div>

      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center glitch-text font-orbitron"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Feedback That <span className="text-[#FF00E5]">Slaps</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-center text-[#B0B0B0] max-w-2xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Create, share, and collect feedback with a vibe that hits different.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        {[
          {
            title: "Create Form",
            description: "Design your feedback form with vibes that match your energy",
            color: "#00D4FF",
            delay: 0.5,
          },
          {
            title: "Share Link",
            description: "Drop the link to your squad and watch the feedback roll in",
            color: "#FF00E5",
            delay: 0.7,
          },
          {
            title: "View Vibes",
            description: "Check out what everyone's saying about your content",
            color: "#39FF14",
            delay: 0.9,
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="cyberpunk-card neon-border p-6 h-full"
            style={{ "--accent-color": card.color } as any}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 20px ${card.color}40`,
            }}
          >
            <h2 className="text-2xl font-bold mb-3" style={{ color: card.color }}>
              {card.title}
            </h2>
            <p className="text-[#B0B0B0]">{card.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="pulse-animation"
      >
        <Link href="/create" className="cyberpunk-button text-lg px-8 py-4 font-bold">
          Get Started
        </Link>
      </motion.div>
    </main>
  )
}
