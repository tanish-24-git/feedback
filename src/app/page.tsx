"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, ImageIcon, MessageSquare, Star, Upload } from "lucide-react"

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "15px"
        cursorRef.current.style.height = "15px"
        cursorRef.current.style.borderColor = "var(--accent-orange)"
      }
    }

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "20px"
        cursorRef.current.style.height = "20px"
        cursorRef.current.style.borderColor = "var(--accent-green)"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor-fx"></div>

      {/* Background with optional uploaded image */}
      <div
        className="absolute inset-0 bg-ai-black z-0"
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
              }
            : {}
        }
      >
        {!backgroundImage && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ai-gray via-ai-black to-black opacity-70"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ai-black"></div>
      </div>

      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 md:px-8 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-3d font-orbitron">
            <span className="text-ai-white">Feedback</span>
            <span className="text-ai-orange"> AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-ai-white/80 max-w-2xl mx-auto">
            Collect insights with the power of artificial intelligence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 mb-12 w-full max-w-md md:max-w-lg"
        >
          <Link href="/create" className="cyberpunk-button flex items-center justify-center gap-2 w-full text-center">
            Get Started <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="cyberpunk-button cyberpunk-button-orange flex items-center justify-center gap-2 w-full"
          >
            Customize Background <ImageIcon size={18} />
          </button>
        </motion.div>

        {/* Image upload section */}
        {showImageUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-md mb-12 overflow-hidden"
          >
            <div className="bg-ai-gray/50 backdrop-blur-md rounded-lg p-6 border border-ai-green/30">
              <h3 className="text-xl font-medium mb-4 text-ai-white">Upload Background Image</h3>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-ai-green/50 rounded-lg cursor-pointer hover:bg-ai-black/30 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-ai-green" />
                  <p className="mb-2 text-sm text-ai-white">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-ai-white/60">PNG, JPG or GIF</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </motion.div>
        )}

        {/* 3D-like cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              title: "Create Forms",
              description: "Design feedback forms with AI-powered suggestions",
              icon: <MessageSquare className="w-10 h-10 text-ai-green" />,
              color: "ai-green",
              delay: 0.6,
            },
            {
              title: "Collect Insights",
              description: "Gather valuable feedback from your audience",
              icon: <Star className="w-10 h-10 text-ai-orange" />,
              color: "ai-orange",
              delay: 0.8,
            },
            {
              title: "Analyze Results",
              description: "Get AI-powered analysis of your feedback data",
              icon: <ImageIcon className="w-10 h-10 text-ai-accent" />,
              color: "ai-accent",
              delay: 1.0,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.5 }}
              whileHover={{
                y: -10,
                boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 15px 0px var(--accent-${card.color})`,
              }}
              className="bg-ai-gray/30 backdrop-blur-md rounded-xl p-6 border border-ai-white/10 transform transition-all duration-300"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className={`text-xl font-bold mb-2 text-${card.color}`}>{card.title}</h3>
              <p className="text-ai-white/70">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="w-8 h-8 text-ai-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
