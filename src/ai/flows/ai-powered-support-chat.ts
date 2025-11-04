'use server';

/**
 * @fileOverview An AI-powered support chat flow that answers user questions and escalates requests to a human if needed.
 *
 * - aiAssistantHandler - A function that handles the support chat process.
 * - AiAssistantInput - The input type for the aiAssistantHandler function.
 * - AiAssistantOutput - The return type for the aiAssistantHandler function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssistantInputSchema = z.object({
  userId: z.string().describe('The ID of the user sending the message.'),
  message: z.string().describe('The message sent by the user.'),
});
export type AiAssistantInput = z.infer<typeof AiAssistantInputSchema>;

const AiAssistantOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user message.'),
  escalate: z.boolean().describe('Whether the request should be escalated to a human agent.'),
});
export type AiAssistantOutput = z.infer<typeof AiAssistantOutputSchema>;

export async function aiAssistantHandler(input: AiAssistantInput): Promise<AiAssistantOutput> {
  return aiAssistantFlow(input);
}

const aiAssistantPrompt = ai.definePrompt({
  name: 'aiAssistantPrompt',
  input: {schema: AiAssistantInputSchema},
  output: {schema: AiAssistantOutputSchema},
  prompt: `You are a customer support AI assistant for Seedo, an application that allows users to earn money by completing tasks.

  Your goal is to answer user questions and provide helpful assistance. If the user's request cannot be resolved with an AI response, set escalate to true.
  Be kind and helpful to the user.
  If escalate is true, also respond with an apology that you cannot fulfill the request and the matter will be escalated to a human operator.

  User Message: {{{message}}}
  `,
});

const aiAssistantFlow = ai.defineFlow(
  {
    name: 'aiAssistantFlow',
    inputSchema: AiAssistantInputSchema,
    outputSchema: AiAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiAssistantPrompt(input);
    return output!;
  }
);
