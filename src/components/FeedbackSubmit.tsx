"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ArrowLeft, Send, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const FeedbackSubmit = () => {
  const router = useRouter()
  const { formId } = router.query

  const [form, setForm] = useState(null)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const fetchForm = async () => {
      if (!formId) return
      try {
        const response = await fetch(`/api/forms/${formId}`)
        if (response.ok) {
          const data = await response.json()
          setForm(data)
        } else {
          console.error("Failed to fetch form")
        }
      } catch (error) {
        console.error("Error fetching form:", error)
      }
    }

    fetchForm()
  }, [formId])

  const handleAnswerChange = (questionId: string | number, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleSubmit = async () => {
    if (!formId) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/submit/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, rating }),
      })

      if (response.ok) {
        alert("Feedback submitted successfully!")
        router.push("/")
      } else {
        alert("Failed to submit feedback.")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("An error occurred while submitting feedback.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!form) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-ai-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-ai-white/70 hover:text-ai-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          className="bg-ai-gray/30 backdrop-blur-md rounded-xl p-6 border border-ai-green/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-orbitron text-ai-green">{form.title}</h1>
            {form.logoUrl && (
              <img src={form.logoUrl || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
            )}
          </div>

          {form.companyName && <p className="text-ai-white/70 mb-6">{form.companyName}</p>}

          <div className="space-y-6 mb-8">
            {form.questions.map((q: any, idx: number) => (
              <motion.div
                key={idx}
                className="bg-ai-black/50 border border-ai-white/10 rounded-lg p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.3 }}
              >
                <label className="block text-ai-white mb-2 font-medium">{q.label}</label>
                {q.type === "text" && (
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-ai-black/50 text-ai-white border border-ai-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ai-green"
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                )}
                {q.type === "textarea" && (
                  <textarea
                    className="w-full px-4 py-2 bg-ai-black/50 text-ai-white border border-ai-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ai-green"
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-ai-orange mb-3 font-medium">Rate this (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-full transition-all ${
                    rating >= star ? "text-ai-orange scale-110" : "text-gray-500 hover:text-gray-300"
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
            className={`cyberpunk-button cyberpunk-button-orange w-full py-3 flex items-center justify-center ${
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

export default FeedbackSubmit
