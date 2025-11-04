"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export function TokenTracker() {
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    // Simulate token usage increasing over time
    const interval = setInterval(() => {
      setUsage((prev) => (prev < 100 ? prev + 0.5 : 100));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="whitespace-nowrap">Token Usage:</span>
      <Progress value={usage} className="h-2" />
      <span className="font-mono text-muted-foreground w-20 text-right">
        {Math.round(usage * 1000)} / 100k
      </span>
    </div>
  );
}
