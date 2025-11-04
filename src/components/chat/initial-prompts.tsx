"use client";

import { generateInitialPromptIdeas } from "@/ai/flows/generate-initial-prompt-ideas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface InitialPromptsProps {
  onPromptClick: (prompt: string) => void;
}

export function InitialPrompts({ onPromptClick }: InitialPromptsProps) {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const result = await generateInitialPromptIdeas();
        setIdeas(result.ideas.slice(0, 4)); // Take first 4 ideas
      } catch (error) {
        console.error("Failed to fetch initial prompt ideas:", error);
        // Fallback ideas
        setIdeas([
          "Summarize a complex article on quantum computing.",
          "Draft an email to a potential client.",
          "Explain the concept of 'machine learning' to a 5-year-old.",
          "Write a Python script to scrape a website.",
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIdeas();
  }, []);

  return (
    <div className="text-center space-y-8">
      <div className="inline-flex items-center gap-3">
        <Bot className="w-12 h-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline">FlowtingAI</h1>
      </div>
      <p className="text-muted-foreground max-w-lg mx-auto">
        Your intelligent collaboration partner. Start by selecting a prompt below or typing your own question.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))
          : ideas.map((idea, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onPromptClick(idea)}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span>Prompt Idea</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{idea}</p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
