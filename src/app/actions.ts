'use server';
import prisma from '@/lib/prisma';

export async function createForm(data: any) {
  console.log('Attempting to create FeedbackForm...');
  try {
    const form = await prisma.feedbackForm.create({
      data: {
        title: data.title,
        questions: data.questions,
        logoUrl: data.logoUrl || null,
        companyName: data.companyName || null,
      },
    });
    console.log('Form created:', form.id);
    return form.id;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
}

export async function submitFeedback(formId: string, data: any) {
  console.log('Attempting to submit feedback for formId:', formId);
  console.log('Feedback data:', data);
  try {
    const response = await prisma.feedbackResponse.create({
      data: {
        formId,
        answers: data.answers,
        rating: data.rating || null,
      },
    });
    console.log('Feedback submitted:', response.id);
    return response.id; // Optional: return the response ID
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}