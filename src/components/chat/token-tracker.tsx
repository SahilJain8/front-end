"use client";

import { useMemo } from "react";
import { useTokenUsage } from "@/context/token-context";

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
  const { usagePercent, isLoading, stats } = useTokenUsage();

  const { formattedTotalUsed, formattedBudget } = useMemo(() => {
    return {
      formattedTotalUsed: formatLargeNumber(stats.totalTokensUsed),
      formattedBudget: formatLargeNumber(MAX_TOKEN_BUDGET),
    };
  }, [stats.totalTokensUsed]);

  return (
    <div className="w-[235px] flex flex-col items-start gap-[3px]">
      {/* Token count label + percentage */}
      <div className="flex items-end gap-[124px]">
        <div className="relative text-[14px] leading-[129%] text-[#1E1E1E]">
          Token count
        </div>
        <div className="relative text-[14px] leading-[129%] text-[#757575] text-right">
          {isLoading ? "--" : `${usagePercent}%`}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-[235px] h-[8px] relative">
        <div className="absolute top-0 left-0 w-[235px] h-[8px] overflow-hidden">
          {/* Background */}
          <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-[10px] bg-[#D4D4D4]" />
          {/* Progress fill */}
          <div
            className="absolute h-full top-0 bottom-0 left-0 rounded-[10px] bg-[#14AE5C]"
            style={{ width: `${Math.max(0, Math.min(100, usagePercent))}%` }}
          />
        </div>
      </div>

      {/* Token usage text */}
      <div className="self-stretch relative text-[10px] leading-[129%] text-[#757575] text-right">
        {isLoading ? "Updating..." : `${formattedTotalUsed}/${formattedBudget}`}
      </div>
    </div>
  );
}
