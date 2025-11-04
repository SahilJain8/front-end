'use server';

/**
 * @fileOverview Flow for creating a custom persona with refined details by the AI.
 *
 * - createCustomPersona - Function to create and refine a custom persona.
 * - CreateCustomPersonaInput - Input type for the createCustomPersona function.
 * - CreateCustomPersonaOutput - Return type for the createCustomPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateCustomPersonaInputSchema = z.object({
  role: z.string().describe('The role of the persona (e.g., researcher, writer, technical expert).'),
  tone: z.string().describe('The tone of the persona (e.g., formal, informal, friendly).'),
  expertise: z.string().describe('The area of expertise of the persona.'),
  description: z.string().describe('A short description of the persona.'),
});
export type CreateCustomPersonaInput = z.infer<typeof CreateCustomPersonaInputSchema>;

const CreateCustomPersonaOutputSchema = z.object({
  refinedRole: z.string().describe('The refined role of the persona.'),
  refinedTone: z.string().describe('The refined tone of the persona.'),
  refinedExpertise: z.string().describe('The refined area of expertise of the persona.'),
  refinedDescription: z.string().describe('A refined description of the persona providing more context.'),
});
export type CreateCustomPersonaOutput = z.infer<typeof CreateCustomPersonaOutputSchema>;

export async function createCustomPersona(input: CreateCustomPersonaInput): Promise<CreateCustomPersonaOutput> {
  return createCustomPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createCustomPersonaPrompt',
  input: {schema: CreateCustomPersonaInputSchema},
  output: {schema: CreateCustomPersonaOutputSchema},
  prompt: `You are an AI assistant designed to refine custom persona details for optimal AI performance. Based on the user-provided role, tone, expertise, and a short description, elaborate and refine these details to provide the AI with the necessary context.

Role: {{{role}}}
Tone: {{{tone}}}
Expertise: {{{expertise}}}
Description: {{{description}}}

Refine the above details to create a more comprehensive and context-rich persona. Return the refined role, tone, expertise and description.
Ensure that the refined description gives the AI sufficient context to embody the persona effectively.
`,
});

const createCustomPersonaFlow = ai.defineFlow(
  {
    name: 'createCustomPersonaFlow',
    inputSchema: CreateCustomPersonaInputSchema,
    outputSchema: CreateCustomPersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
