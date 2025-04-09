'use client';
import { useState } from 'react';

export default function QuestionInput({ question, onChange }: { question: any; onChange: (q: any) => void }) {
  const [content, setContent] = useState(question.content);
  const [options, setOptions] = useState<string[]>(question.options || []);

  const handleChange = () => {
    onChange({ ...question, content, options });
  };

  return (
    <div className="mb-4 p-2 border">
      <input
        type="text"
        placeholder="Question"
        value={content}
        onChange={(e) => { setContent(e.target.value); handleChange(); }}
        className="w-full p-2 mb-2 border"
      />
      {question.type === 'mcq' && (
        <div>
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[idx] = e.target.value;
                setOptions(newOptions);
                handleChange();
              }}
              className="w-full p-2 mb-2 border"
            />
          ))}
          <button onClick={() => setOptions([...options, ''])} className="p-1 bg-gray-300">
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}