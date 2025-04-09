import FeedbackSubmit from "@/components/FeedbackSubmit"
import prisma from "@/lib/prisma"

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const form = await prisma.feedbackForm.findUnique({
    where: { id: params.id },
  })

  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="cyberpunk-card neon-border-pink text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-[#FF00E5] mb-4">Form Not Found</h1>
          <p className="text-[#B0B0B0]">The feedback form you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )

  return <FeedbackSubmit form={form} />
}
