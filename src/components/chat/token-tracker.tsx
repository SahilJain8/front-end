"use client";

import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { fetchTokenStats, type TokenStats } from "@/lib/api/tokens";
import { useAuth } from "@/context/auth-context";

// Assuming a max token budget for display purposes, adjust as needed.
// For example, if '2m' means 2 million.
const MAX_TOKEN_BUDGET = 2_000_000; 

const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
};

export function TokenTracker() {
  const { csrfToken } = useAuth();
  const [stats, setStats] = useState<TokenStats>({
    availableTokens: 0,
    totalTokensUsed: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTokenStats(csrfToken);
        if (isMounted) {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load token stats", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadStats();
    const interval = setInterval(loadStats, 30_000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [csrfToken]);

  const { usagePercent, formattedTotalUsed, formattedBudget } = useMemo(() => {
    const totalUsed = stats.totalTokensUsed;
    const totalBudget = MAX_TOKEN_BUDGET; // Use the predefined max budget for display
    
    const percent = Math.min(
      100,
      (totalUsed / totalBudget) * 100
    );

    return {
      usagePercent: Math.round(percent),
      formattedTotalUsed: formatLargeNumber(totalUsed),
      formattedBudget: formatLargeNumber(totalBudget),
    };
  }, [stats.totalTokensUsed]);

  return (
    <div className="flex flex-col gap-1 w-full text-sm">
      <div className="flex items-center justify-between text-muted-foreground">
        <span>Token count</span>
        <span className="font-mono text-xs">
          {isLoading ? "…" : `${usagePercent}%`}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Progress
          value={usagePercent}
          className="h-[6px] flex-grow rounded-[40px]"
          indicatorClassName="bg-green-500"
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {isLoading ? "…" : `${formattedTotalUsed}/${formattedBudget}`}
        </span>
      </div>
    </div>
  );
}
