import FeedbackSubmit from '@/components/FeedbackSubmit';
import prisma from '@/lib/prisma';

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const form = await prisma.feedbackForm.findUnique({
    where: { id: params.id },
  });

  if (!form) return <p>Form not found</p>;

  return <FeedbackSubmit form={form} />;
}