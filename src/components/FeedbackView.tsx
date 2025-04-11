"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star } from "lucide-react"
import { motion } from "framer-motion"

interface Form {
  id: string
  title: string
  companyName?: string
  logoUrl?: string
  questions: { content: string }[]
}

interface Response {
  id: string
  answers: { [key: string]: any }
  rating?: number
  submittedAt: string
}

const FeedbackView = () => {
  const { id } = useParams<{ id: string }>()
  const [form, setForm] = useState<Form | null>(null)
  const [responses, setResponses] = useState<Response[]>([])
  const [filter, setFilter] = useState<number | null>(null)

  useEffect(() => {
    // Mock API calls - replace with actual API calls
    const fetchForm = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockFormData: Form = {
        id: "1",
        title: "Product Feedback Form",
        companyName: "Acme Corp",
        logoUrl: "/acme-logo.png",
        questions: [{ content: "How satisfied are you with our product?" }, { content: "What could we improve?" }],
      }
      setForm(mockFormData)
    }

    const fetchResponses = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockResponses: Response[] = [
        {
          id: "1",
          answers: { "0": "Very satisfied", "1": "More features" },
          rating: 5,
          submittedAt: new Date().toISOString(),
        },
        {
          id: "2",
          answers: { "0": "Okay", "1": "Better UI" },
          rating: 3,
          submittedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        },
        {
          id: "3",
          answers: { "0": "Not great", "1": "Everything" },
          rating: 1,
          submittedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ]
      setResponses(mockResponses)
    }

    fetchForm()
    fetchResponses()
  }, [id])

  if (!form) {
    return <div>Loading...</div>
  }

  const averageRating =
    responses.length > 0
      ? (responses.reduce((sum, response) => sum + (response.rating || 0), 0) / responses.length).toFixed(1)
      : "N/A"

  const filteredResponses = filter === null ? responses : responses.filter((response) => response.rating === filter)

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-ai-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-ai-white/70 hover:text-ai-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          className="bg-ai-gray/30 backdrop-blur-md rounded-xl p-6 border border-ai-green/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold font-orbitron text-ai-green">{form.title}</h1>
            {form.logoUrl && (
              <img src={form.logoUrl || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
            )}
          </div>

          {form.companyName && <p className="text-ai-white/70 mb-4">{form.companyName}</p>}

          <div className="flex items-center justify-between mb-6 p-4 bg-ai-black/50 rounded-lg border border-ai-white/10">
            <div>
              <p className="text-ai-white/70">Total Responses</p>
              <p className="text-2xl font-bold text-ai-white">{responses.length}</p>
            </div>

            <div className="text-center">
              <p className="text-ai-white/70">Average Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-ai-green mr-2">{averageRating}</p>
                <Star size={20} fill={averageRating !== "N/A" ? "#0FFF50" : "none"} className="text-ai-green" />
              </div>
            </div>

            <div>
              <p className="text-ai-white/70">Filter by Rating</p>
              <div className="flex gap-1 mt-1">
                {[null, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating === null ? "all" : rating}
                    onClick={() => setFilter(rating)}
                    className={`px-2 py-1 rounded text-xs ${
                      filter === rating ? "bg-ai-green text-ai-black font-bold" : "bg-ai-black/70 text-ai-white"
                    }`}
                  >
                    {rating === null ? "All" : rating}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-ai-orange">Responses</h2>

          {filteredResponses.length === 0 ? (
            <motion.div
              className="bg-ai-black/50 p-8 text-center rounded-lg border border-ai-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl font-bold text-ai-white/70 mb-2">No Responses Yet</p>
              <p className="text-ai-white/50">
                {filter ? "No responses with this rating yet." : "Share your form to collect feedback!"}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredResponses.map((response, idx) => (
                <motion.div
                  key={response.id}
                  className="bg-ai-gray/30 backdrop-blur-md rounded-xl p-5 border border-ai-green/20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-ai-white/50 text-sm">{new Date(response.submittedAt).toLocaleString()}</p>

                    <div className="flex items-center">
                      <p className="mr-2 text-ai-green font-bold">{response.rating || "N/A"}</p>
                      {response.rating && <Star size={16} fill="#0FFF50" className="text-ai-green" />}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(response.answers).map(([qIdx, answer]: [string, any], i) => (
                      <div key={i} className="bg-ai-black/50 p-3 rounded-lg border border-ai-white/10">
                        <p className="text-ai-white/70 text-sm mb-1">{form.questions[qIdx]?.content || "Question"}</p>
                        <p className="text-ai-white">{answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FeedbackView
