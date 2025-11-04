'use server';

/**
 * @fileOverview Summarizes contextual information from the insight pinboard.
 *
 * - summarizeContextualInformation - A function that summarizes the information.
 * - SummarizeContextualInformationInput - The input type for the summarizeContextualInformation function.
 * - SummarizeContextualInformationOutput - The return type for the summarizeContextualInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContextualInformationInputSchema = z.object({
  pins: z.array(z.string()).describe('An array of pin contents to summarize.'),
});
export type SummarizeContextualInformationInput = z.infer<typeof SummarizeContextualInformationInputSchema>;

const SummarizeContextualInformationOutputSchema = z.object({
  summary: z.string().describe('A summary of the provided pin contents.'),
});
export type SummarizeContextualInformationOutput = z.infer<typeof SummarizeContextualInformationOutputSchema>;

export async function summarizeContextualInformation(input: SummarizeContextualInformationInput): Promise<SummarizeContextualInformationOutput> {
  return summarizeContextualInformationFlow(input);
}

const summarizeContextualInformationPrompt = ai.definePrompt({
  name: 'summarizeContextualInformationPrompt',
  input: {schema: SummarizeContextualInformationInputSchema},
  output: {schema: SummarizeContextualInformationOutputSchema},
  prompt: `Summarize the following information from the insight pinboard. The goal is to provide a concise overview of the key points.

{% if pins.length %}
{% each pins %}
- {{{this}}}
{% endeach %}
{% else %}
No pins to summarize.
{% endif %}`,
});

const summarizeContextualInformationFlow = ai.defineFlow(
  {
    name: 'summarizeContextualInformationFlow',
    inputSchema: SummarizeContextualInformationInputSchema,
    outputSchema: SummarizeContextualInformationOutputSchema,
  },
  async input => {
    const {output} = await summarizeContextualInformationPrompt(input);
    return output!;
  }
);
