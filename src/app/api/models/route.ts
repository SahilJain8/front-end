import { NextResponse } from 'next/server';
import type { AIModel } from '@/types/model';

/**
 * GET /api/models
 * Fetches available AI models from the backend server
 *
 * Response format:
 * [
 *   {
 *     "modelName": "GPT-4",
 *     "companyName": "OpenAI",
 *     "version": "4.0",
 *     "inputLimit": 128000,  // max input tokens
 *     "outputLimit": 4096     // max output tokens
 *   }
 * ]
 */
export async function GET() {
  try {
    // Get backend API URL from environment variables
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
    const modelsEndpoint = process.env.MODELS_API_ENDPOINT || '/api/models';
    const apiUrl = `${backendUrl}${modelsEndpoint}`;

    // Make GET request to backend server
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Disable caching for fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend API returned status ${response.status}`);
    }

    // Parse JSON response
    const models: AIModel[] = await response.json();

    // Validate response structure
    if (!Array.isArray(models)) {
      throw new Error('Invalid response format: expected an array');
    }

    // Return models to client
    return NextResponse.json(models);

  } catch (error) {
    console.error('Error fetching models:', error);

    // Return error response with appropriate status code
    return NextResponse.json(
      {
        error: 'Failed to fetch models',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
