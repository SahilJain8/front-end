'use server';

/**
 * @fileOverview Generates initial prompt ideas for new users to quickly get started with the AI platform.
 *
 * - generateInitialPromptIdeas - A function that generates initial prompt ideas.
 * - InitialPromptIdeasOutput - The return type for the generateInitialPromptIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialPromptIdeasOutputSchema = z.object({
  ideas: z.array(
    z.string().describe('A prompt idea to help new users get started.')
  ).describe('A list of initial prompt ideas for new users.'),
});

export type InitialPromptIdeasOutput = z.infer<typeof InitialPromptIdeasOutputSchema>;

export async function generateInitialPromptIdeas(): Promise<InitialPromptIdeasOutput> {
  return generateInitialPromptIdeasFlow();
}

const prompt = ai.definePrompt({
  name: 'initialPromptIdeasPrompt',
  output: {schema: InitialPromptIdeasOutputSchema},
  prompt: `You are an AI assistant designed to help new users get started with the platform.
  Generate a list of prompt ideas based on common use cases such as research, writing, and technical tasks.
  The goal is to help users quickly understand the capabilities of the AI platform and start using it effectively.
  Return the ideas as a list of strings.
  Do not add any introductory or concluding sentences to your response. Just return the ideas.
  Here are a few examples:
  - "Summarize the key findings of the latest research on climate change."
  - "Write a short story about a robot who falls in love with a human."
  - "Debug the following code snippet."
  `,
});

const generateInitialPromptIdeasFlow = ai.defineFlow(
  {
    name: 'generateInitialPromptIdeasFlow',
    outputSchema: InitialPromptIdeasOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
