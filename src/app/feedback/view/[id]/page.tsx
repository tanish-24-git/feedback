import FeedbackView from '@/components/FeedbackView';
import prisma from '@/lib/prisma';

export default async function ViewFeedbackPage({ params }: { params: { id: string } }) {
  const form = await prisma.feedbackForm.findUnique({
    where: { id: params.id },
  });
  const responses = await prisma.feedbackResponse.findMany({
    where: { formId: params.id },
  });

  if (!form) return <p>Form not found</p>;

  return <FeedbackView form={form} responses={responses} />;
}