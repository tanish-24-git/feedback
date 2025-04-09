"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

export default function FeedbackView({ form, responses }: { form: any; responses: any[] }) {
  const [filter, setFilter] = useState<number | null>(null)

  const averageRating = responses.length
    ? (responses.reduce((sum, r) => sum + (r.rating || 0), 0) / responses.length).toFixed(1)
    : "N/A"

  const filteredResponses = filter ? responses.filter((r) => r.rating === filter) : responses

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-[#B0B0B0] hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          className="cyberpunk-card neon-border-green mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold font-orbitron text-[#39FF14]">{form.title}</h1>
            {form.logoUrl && (
              <img src={form.logoUrl || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
            )}
          </div>

          {form.companyName && <p className="text-[#B0B0B0] mb-4">{form.companyName}</p>}

          <div className="flex items-center justify-between mb-6 p-4 bg-black/30 rounded-lg">
            <div>
              <p className="text-[#B0B0B0]">Total Responses</p>
              <p className="text-2xl font-bold text-white">{responses.length}</p>
            </div>

            <div className="text-center">
              <p className="text-[#B0B0B0]">Average Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-[#39FF14] mr-2">{averageRating}</p>
                <Star size={20} fill={averageRating !== "N/A" ? "#39FF14" : "none"} className="text-[#39FF14]" />
              </div>
            </div>

            <div>
              <p className="text-[#B0B0B0]">Filter by Rating</p>
              <div className="flex gap-1 mt-1">
                {[null, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating === null ? "all" : rating}
                    onClick={() => setFilter(rating)}
                    className={`px-2 py-1 rounded text-xs ${
                      filter === rating ? "bg-[#39FF14] text-black font-bold" : "bg-black/30 text-white"
                    }`}
                  >
                    {rating === null ? "All" : rating}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold mb-4 text-[#39FF14]">Responses</h2>

        {filteredResponses.length === 0 ? (
          <motion.div
            className="cyberpunk-card bg-black/30 p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-bold text-[#B0B0B0] mb-2 glitch-text">No Vibes Yet</p>
            <p className="text-[#B0B0B0]">
              {filter ? "No responses with this rating yet." : "Share your form to collect feedback!"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredResponses.map((response, idx) => (
              <motion.div
                key={response.id}
                className="cyberpunk-card neon-border-green"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[#B0B0B0] text-sm">{new Date(response.submittedAt).toLocaleString()}</p>

                  <div className="flex items-center">
                    <p className="mr-2 text-[#39FF14] font-bold">{response.rating || "N/A"}</p>
                    {response.rating && <Star size={16} fill="#39FF14" className="text-[#39FF14]" />}
                  </div>
                </div>

                <div className="space-y-3">
                  {Object.entries(response.answers).map(([qIdx, answer]: [string, any], i) => (
                    <div key={i} className="bg-black/20 p-3 rounded-lg">
                      <p className="text-[#B0B0B0] text-sm mb-1">{form.questions[qIdx]?.content || "Question"}</p>
                      <p className="text-white">{answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
