"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { createForm } from "@/app/actions"
import { ArrowLeft, Plus, Zap } from "lucide-react"
import Link from "next/link"
import ThreeDText from "@/components/3DText"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<any[]>([])
  const [logoUrl, setLogoUrl] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [link, setLink] = useState<string | null>(null)
  const [viewLink, setViewLink] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

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

  const addQuestion = (type: string) => {
    setQuestions([...questions, { type, content: "", options: type === "mcq" ? [] : undefined }])
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const data = {
        title: formData.get("title") as string,
        questions: questions,
        logoUrl: formData.get("logoUrl") as string | null,
        companyName: formData.get("companyName") as string | null,
      }
      const id = await createForm(data)
      const submissionLink = `${window.location.origin}/feedback/${id}`
      const feedbackViewLink = `${window.location.origin}/feedback/view/${id}`
      setLink(submissionLink)
      setViewLink(feedbackViewLink)
      setShowLinks(true)
    } catch (error) {
      console.error("Error creating form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuestionChange = (index: number, updatedQuestion: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = updatedQuestion
    setQuestions(newQuestions)
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-ai-black relative">
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor-fx"></div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ai-gray via-ai-black to-black opacity-70 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <Link href="/" className="inline-flex items-center text-ai-white/70 hover:text-ai-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        <ThreeDText text="Create Your Form" color="#0FFF50" />

        <motion.div
          className="bg-ai-gray/30 backdrop-blur-md rounded-xl p-6 border border-ai-orange/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-ai-orange mb-2 font-medium">
                Form Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-ai-black/50 border border-ai-orange/30 rounded-md text-ai-white"
                required
              />
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-ai-orange mb-2 font-medium">
                Logo URL (optional)
              </label>
              <input
                type="text"
                id="logoUrl"
                name="logoUrl"
                placeholder="URL to your logo..."
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full p-3 bg-ai-black/50 border border-ai-orange/30 rounded-md text-ai-white"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-ai-orange mb-2 font-medium">
                Company/Brand Name (optional)
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Your brand name..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 bg-ai-black/50 border border-ai-orange/30 rounded-md text-ai-white"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-medium mb-4 text-ai-orange">Questions</h3>

              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => addQuestion("direct")}
                  className="cyberpunk-button flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Text Question
                </button>
                <button
                  type="button"
                  onClick={() => addQuestion("mcq")}
                  className="cyberpunk-button cyberpunk-button-orange flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Multiple Choice
                </button>
                <button
                  type="button"
                  onClick={() => addQuestion("category")}
                  className="cyberpunk-button cyberpunk-button-blue flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Category Question
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((question, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-ai-black/50 border border-ai-white/10 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionInput question={question} onChange={(updated) => handleQuestionChange(idx, updated)} />
                  </motion.div>
                ))}

                {questions.length === 0 && (
                  <div className="text-center py-8 text-ai-white/60">
                    No questions yet. Add some questions to get started!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || questions.length === 0}
                className={`cyberpunk-button cyberpunk-button-green flex items-center justify-center w-full py-3 ${
                  isSubmitting || questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span>Generating...</span>
                ) : (
                  <>
                    <Zap size={18} className="mr-2" />
                    Generate Link
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {showLinks && (
          <motion.div
            className="bg-ai-gray/30 backdrop-blur-md rounded-xl p-6 border border-ai-green/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-ai-green">Your Form is Ready!</h2>

            <div className="space-y-4">
              <div>
                <p className="text-ai-white/70 mb-2">Share this link to collect feedback:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={link || ""}
                    className="w-full p-3 bg-ai-black/50 border border-ai-white/20 rounded-md text-ai-white"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(link || "")
                      alert("Link copied to clipboard!")
                    }}
                    className="ml-2 cyberpunk-button"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <p className="text-ai-white/70 mb-2">View responses here:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={viewLink || ""}
                    className="w-full p-3 bg-ai-black/50 border border-ai-white/20 rounded-md text-ai-white"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(viewLink || "")
                      alert("Link copied to clipboard!")
                    }}
                    className="ml-2 cyberpunk-button"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Link href={link || "#"} className="cyberpunk-button flex-1 text-center">
                  View Form
                </Link>
                <Link href={viewLink || "#"} className="cyberpunk-button cyberpunk-button-orange flex-1 text-center">
                  View Responses
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function QuestionInput({ question, onChange }: { question: any; onChange: (q: any) => void }) {
  const [content, setContent] = useState(question.content)
  const [options, setOptions] = useState<string[]>(question.options || [])

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    onChange({ ...question, content: e.target.value, options })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
    onChange({ ...question, content, options: newOptions })
  }

  const addOption = () => {
    setOptions([...options, ""])
    onChange({ ...question, content, options: [...options, ""] })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-ai-white/70 mb-1 text-sm">
          {question.type === "direct"
            ? "Text Question"
            : question.type === "mcq"
              ? "Multiple Choice Question"
              : "Category Question"}
        </label>
        <input
          type="text"
          placeholder={
            question.type === "direct"
              ? "Ask something..."
              : question.type === "mcq"
                ? "Multiple choice question..."
                : "Category question..."
          }
          value={content}
          onChange={handleContentChange}
          className="w-full p-3 bg-ai-black/50 border border-ai-white/20 rounded-md text-ai-white"
        />
      </div>

      {question.type === "mcq" && (
        <div className="space-y-2">
          <label className="block text-ai-white/70 text-sm">Options</label>

          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full p-2 bg-ai-black/50 border border-ai-white/20 rounded-md text-ai-white"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="text-sm text-ai-green hover:text-ai-white flex items-center transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add Option
          </button>
        </div>
      )}
    </div>
  )
}
