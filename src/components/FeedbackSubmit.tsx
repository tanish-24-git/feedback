'use client';
import { useState } from 'react';
import { submitFeedback } from '@/app/actions';

export default function FeedbackSubmit({ form }: { form: any }) {
  const [answers, setAnswers] = useState<any>({});
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    const data = { answers, rating };
    await submitFeedback(form.id, data); // Call server action
    alert('Feedback submitted!');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">{form.title}</h1>
      {form.logoUrl && <img src={form.logoUrl} alt="Logo" className="w-20 mb-4" />}
      {form.companyName && <p className="mb-4">{form.companyName}</p>}
      {form.questions.map((q: any, idx: number) => (
        <div key={idx} className="mb-4">
          <p>{q.content}</p>
          {q.type === 'mcq' ? (
            <select
              onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
              className="w-full p-2 border"
            >
              <option value="">Select</option>
              {q.options.map((opt: string, i: number) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
              className="w-full p-2 border"
            />
          )}
        </div>
      ))}
      <div className="mb-4">
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full p-2 border"
        />
      </div>
      <button onClick={handleSubmit} className="p-2 bg-green-500 text-white">
        Submit Feedback
      </button>
    </div>
  );
}