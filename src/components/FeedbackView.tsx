'use client';
export default function FeedbackView({ form, responses }: { form: any; responses: any[] }) {
  const averageRating = responses.length
    ? (responses.reduce((sum, r) => sum + (r.rating || 0), 0) / responses.length).toFixed(1)
    : 'N/A';

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">{form.title}</h1>
      {form.logoUrl && <img src={form.logoUrl} alt="Logo" className="w-20 mb-4" />}
      {form.companyName && <p className="mb-4">{form.companyName}</p>}
      <p>Average Rating: {averageRating}</p>
      <h2 className="text-xl mb-2">Responses</h2>
      {responses.map((r, idx) => (
        <div key={idx} className="mb-4 p-2 border">
          <p>Rating: {r.rating || 'N/A'}</p>
          {Object.entries(r.answers).map(([qIdx, answer]: any, i) => (
            <p key={i}>{form.questions[qIdx].content}: {answer}</p>
          ))}
        </div>
      ))}
    </div>
  );
}