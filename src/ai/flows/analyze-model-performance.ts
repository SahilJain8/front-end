'use server';

/**
 * @fileOverview This file defines a Genkit flow to analyze model performance data and present key insights in a table format.
 *
 * - analyzeModelPerformance - A function that analyzes model performance data and returns insights in a table.
 * - AnalyzeModelPerformanceInput - The input type for the analyzeModelPerformance function.
 * - AnalyzeModelPerformanceOutput - The return type for the analyzeModelPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeModelPerformanceInputSchema = z.object({
  modelA: z.string().describe('The name of the first model to compare.'),
  modelB: z.string().describe('The name of the second model to compare.'),
  latencyA: z.number().describe('The latency of model A in milliseconds.'),
  latencyB: z.number().describe('The latency of model B in milliseconds.'),
  pricingA: z.number().describe('The pricing of model A per 1000 tokens.'),
  pricingB: z.number().describe('The pricing of model B per 1000 tokens.'),
  tokenUsageA: z.number().describe('The token usage of model A for a specific task.'),
  tokenUsageB: z.number().describe('The token usage of model B for the same task.'),
});
export type AnalyzeModelPerformanceInput = z.infer<typeof AnalyzeModelPerformanceInputSchema>;

const AnalyzeModelPerformanceOutputSchema = z.object({
  analysis: z.string().describe('A table summarizing the model performance data and key insights.'),
});
export type AnalyzeModelPerformanceOutput = z.infer<typeof AnalyzeModelPerformanceOutputSchema>;

export async function analyzeModelPerformance(input: AnalyzeModelPerformanceInput): Promise<AnalyzeModelPerformanceOutput> {
  return analyzeModelPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeModelPerformancePrompt',
  input: {schema: AnalyzeModelPerformanceInputSchema},
  output: {schema: AnalyzeModelPerformanceOutputSchema},
  prompt: `You are an AI performance analyst. Analyze the performance of two AI models based on the following data and present your analysis in a markdown table with the following columns: Metric, Model A, Model B, Insight. The table should contain the following metrics: Latency (ms), Pricing (per 1000 tokens), Token Usage. Provide an insight for each metric comparing the two models. Use the following data:

Model A: {{{modelA}}}
Model B: {{{modelB}}}
Latency A: {{{latencyA}}} ms
Latency B: {{{latencyB}}} ms
Pricing A: {{{pricingA}}}
Pricing B: {{{pricingB}}}
Token Usage A: {{{tokenUsageA}}}
Token Usage B: {{{tokenUsageB}}}`,
});

const analyzeModelPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeModelPerformanceFlow',
    inputSchema: AnalyzeModelPerformanceInputSchema,
    outputSchema: AnalyzeModelPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
