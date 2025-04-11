"use client"
import { useState } from "react"
import type React from "react"

import { createForm } from "@/app/actions"
import { Plus, Zap } from "lucide-react"

export default function FeedbackForm() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<any[]>([])
  const [logoUrl, setLogoUrl] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [link, setLink] = useState<string | null>(null)
  const [viewLink, setViewLink] = useState<string | null>(null)

  const addQuestion = (type: string) => {
    setQuestions([...questions, { type, content: "", options: type === "mcq" ? [] : undefined }])
  }

  const handleSubmit = async (formData: FormData) => {
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
  }

  const handleQuestionChange = (index: number, updatedQuestion: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = updatedQuestion
    setQuestions(newQuestions)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-ai-gray/30 backdrop-blur-md rounded-xl border border-ai-green/20">
      <h1 className="text-2xl font-bold mb-6 text-ai-green">Create Feedback Form</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-ai-white mb-2">
            Form Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter form title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-ai-black/50 border border-ai-green/30 rounded-md text-ai-white"
          />
        </div>

        <div>
          <label htmlFor="logoUrl" className="block text-ai-white mb-2">
            Logo URL (optional)
          </label>
          <input
            type="text"
            name="logoUrl"
            placeholder="Enter logo URL"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full p-3 bg-ai-black/50 border border-ai-green/30 rounded-md text-ai-white"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-ai-white mb-2">
            Company Name (optional)
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 bg-ai-black/50 border border-ai-green/30 rounded-md text-ai-white"
          />
        </div>

        <div className="pt-4">
          <h3 className="text-xl font-medium mb-4 text-ai-orange">Questions</h3>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              type="button"
              onClick={() => addQuestion("direct")}
              className="cyberpunk-button flex items-center text-sm"
            >
              <Plus size={16} className="mr-2" />
              Text Question
            </button>

            <button
              type="button"
              onClick={() => addQuestion("mcq")}
              className="cyberpunk-button cyberpunk-button-orange flex items-center text-sm"
            >
              <Plus size={16} className="mr-2" />
              Multiple Choice
            </button>

            <button
              type="button"
              onClick={() => addQuestion("category")}
              className="cyberpunk-button cyberpunk-button-blue flex items-center text-sm"
            >
              <Plus size={16} className="mr-2" />
              Category Question
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((question, idx) => (
              <div key={idx} className="bg-ai-black/40 border border-ai-white/10 rounded-lg p-4">
                <QuestionInput question={question} onChange={(updated) => handleQuestionChange(idx, updated)} />
              </div>
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
            disabled={questions.length === 0}
            className={`cyberpunk-button w-full py-3 flex items-center justify-center ${
              questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Zap size={18} className="mr-2" />
            Generate Link
          </button>
        </div>
      </form>

      {link && (
        <div className="mt-6 p-4 bg-ai-black/40 border border-ai-green/30 rounded-lg">
          <p className="text-ai-white mb-2">Feedback submission link:</p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              readOnly
              value={link}
              className="w-full p-2 bg-ai-black/70 border border-ai-white/20 rounded-md text-ai-white text-sm"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(link)
                alert("Link copied to clipboard!")
              }}
              className="ml-2 cyberpunk-button text-sm"
            >
              Copy
            </button>
          </div>

          {viewLink && (
            <>
              <p className="text-ai-white mb-2">View feedback responses:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={viewLink}
                  className="w-full p-2 bg-ai-black/70 border border-ai-white/20 rounded-md text-ai-white text-sm"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(viewLink)
                    alert("Link copied to clipboard!")
                  }}
                  className="ml-2 cyberpunk-button text-sm"
                >
                  Copy
                </button>
              </div>
            </>
          )}
        </div>
      )}
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
          placeholder="Enter your question"
          value={content}
          onChange={handleContentChange}
          className="w-full p-2 bg-ai-black/50 border border-ai-white/20 rounded-md text-ai-white"
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
