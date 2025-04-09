"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { submitFeedback } from "@/app/actions"
import { ArrowLeft, Send, Star } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function FeedbackSubmit({ form }: { form: any }) {
  const [answers, setAnswers] = useState<any>({})
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const data = { answers, rating }
      await submitFeedback(form.id, data)
      setIsSubmitted(true)

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="cyberpunk-card neon-border-green text-center p-8 max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-[#39FF14] mb-4">Thanks for the feedback!</h1>
          <p className="text-[#B0B0B0] mb-6">Your response has been submitted successfully.</p>
          <Link href="/" className="cyberpunk-button cyberpunk-button-green inline-block">
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-[#B0B0B0] hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          className="cyberpunk-card neon-border-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-orbitron text-[#00D4FF]">{form.title}</h1>
            {form.logoUrl && (
              <img src={form.logoUrl || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
            )}
          </div>

          {form.companyName && <p className="text-[#B0B0B0] mb-6">{form.companyName}</p>}

          <div className="space-y-6 mb-8">
            {form.questions.map((q: any, idx: number) => (
              <motion.div
                key={idx}
                className="cyberpunk-card bg-black/30 border border-[#333] rounded-lg p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.3 }}
              >
                <p className="text-white mb-3 font-medium">{q.content}</p>

                {q.type === "mcq" ? (
                  <select
                    onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                    className="cyberpunk-input w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {q.options.map((opt: string, i: number) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                    className="cyberpunk-input w-full"
                    placeholder="Drop your thoughts, fam..."
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-[#00D4FF] mb-3 font-medium">Rate this, no cap (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-full transition-all ${
                    rating >= star ? "text-yellow-400 scale-110" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(answers).length === 0}
            className={`cyberpunk-button cyberpunk-button-pink w-full py-3 flex items-center justify-center ${
              isSubmitting || Object.keys(answers).length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Submit Feedback
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
