"use client";

import { useState } from "react";
import { summarizeContextualInformation } from "@/ai/flows/summarize-contextual-information";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Pin, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialPins = [
  "Model A has lower latency but higher pricing.",
  "User feedback indicates a preference for Model B's response quality.",
  "Token usage for summarization tasks is 20% lower with Model A.",
];

export function RightSidebar() {
  const [pins, setPins] = useState<string[]>(initialPins);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary("");
    try {
      const result = await summarizeContextualInformation({ pins });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error summarizing pins:", error);
      toast({
        title: "Error",
        description: "Could not summarize the pinned insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-80 border-l bg-card hidden lg:flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold font-headline">Insight Pinboard</h2>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search pins..." className="pl-9" />
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Pinned Items</h3>
          {pins.map((pin, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-3 flex items-start gap-3">
                <Pin className="h-4 w-4 mt-1 text-primary shrink-0" />
                <p className="text-sm">{pin}</p>
              </CardContent>
            </Card>
          ))}
          
          <Button onClick={handleSummarize} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Summarize Insights"}
          </Button>

          {summary && (
             <Card className="bg-primary/10 border-primary/20">
              <CardHeader className="p-3">
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-sm">{summary}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Personal Notes</h3>
        <Textarea placeholder="Jot down your thoughts..." rows={5} />
      </div>
    </aside>
  );
}
