import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-prompt-ideas.ts';
import '@/ai/flows/analyze-model-performance.ts';
import '@/ai/flows/create-custom-persona.ts';
import '@/ai/flows/summarize-contextual-information.ts';