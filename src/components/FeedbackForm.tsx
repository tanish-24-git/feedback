'use client';
import { useState } from 'react';
import QuestionInput from './QuestionInput';
import { createForm } from '@/app/actions';

export default function FeedbackForm() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [link, setLink] = useState<string | null>(null); // Feedback submission link
  const [viewLink, setViewLink] = useState<string | null>(null); // Feedback view link

  const addQuestion = (type: string) => {
    setQuestions([...questions, { type, content: '', options: type === 'mcq' ? [] : undefined }]);
  };

  const handleSubmit = async (formData: FormData) => {
    const data = {
      title: formData.get('title') as string,
      questions: questions,
      logoUrl: formData.get('logoUrl') as string | null,
      companyName: formData.get('companyName') as string | null,
    };
    const id = await createForm(data);
    const submissionLink = `http://localhost:3000/feedback/${id}`;
    const feedbackViewLink = `http://localhost:3000/feedback/view/${id}`;
    setLink(submissionLink); // Set submission link
    setViewLink(feedbackViewLink); // Set view link
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Create Feedback Form</h1>
      <form action={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="text"
          name="logoUrl"
          placeholder="Logo URL (optional)"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name (optional)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 mb-2 border"
        />
        <div className="mb-4">
          <button type="button" onClick={() => addQuestion('direct')} className="p-2 bg-blue-500 text-white mr-2">
            Add Direct Question
          </button>
          <button type="button" onClick={() => addQuestion('mcq')} className="p-2 bg-blue-500 text-white mr-2">
            Add MCQ
          </button>
          <button type="button" onClick={() => addQuestion('category')} className="p-2 bg-blue-500 text-white">
            Add Category Question
          </button>
        </div>
        {questions.map((q, idx) => (
          <QuestionInput
            key={idx}
            question={q}
            onChange={(updated) => {
              const newQuestions = [...questions];
              newQuestions[idx] = updated;
              setQuestions(newQuestions);
            }}
          />
        ))}
        <button type="submit" className="p-2 bg-green-500 text-white">
          Generate Link
        </button>
      </form>
      {link && (
        <div className="mt-4">
          <p>
            Feedback submission link: <a href={link} className="text-blue-500">{link}</a>
          </p>
          {viewLink && (
            <p>
              View feedback: <a href={viewLink} className="text-blue-500">{viewLink}</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}