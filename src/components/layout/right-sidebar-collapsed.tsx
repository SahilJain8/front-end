"use client";

import { Pin, File, UserPlus, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RightSidebarCollapsedProps {
  onToggle: () => void;
  className?: string;
}

export function RightSidebarCollapsed({ onToggle, className }: RightSidebarCollapsedProps) {
  return (
    <aside
      className={cn(
        "hidden h-full w-[62px] flex-col items-center justify-center border-l border-[#D9D9D9] bg-white lg:flex",
        className
      )}
    >
      <div className="flex h-full w-full flex-col items-center gap-7 border border-[#D9D9D9] bg-white px-[13px] pb-[652px] pt-[22px]">
        <div className="flex w-[35px] flex-col items-center justify-center gap-7">
          <Button
            onClick={onToggle}
            className="flex h-[49px] w-[49px] flex-col items-center gap-1 rounded-xl bg-[#1E1E1E] p-1 hover:bg-[#2C2C2C]"
          >
            <Pin className="h-[26px] w-[26px] text-[#D9D9D9]" strokeWidth={1.5} />
            <span className="text-center text-[11px] font-semibold leading-[140%] text-[#F3F3F3]">
              Pin
            </span>
          </Button>

          <Button
            variant="ghost"
            className="flex h-[49px] w-[49px] flex-col items-center gap-1 rounded-xl p-1 hover:bg-[#F5F5F5]"
          >
            <File className="h-[26px] w-[26px] text-[#525252]" strokeWidth={1.5} />
            <span className="text-center text-[11px] font-semibold leading-[140%] text-[#5A5A5A]">
              Files
            </span>
          </Button>

          <Button
            variant="ghost"
            className="flex h-[49px] w-[49px] flex-col items-center gap-1 rounded-xl p-1 hover:bg-[#F5F5F5]"
          >
            <UserPlus className="h-[26px] w-[26px] text-[#525252]" strokeWidth={1.5} />
            <span className="text-center text-[11px] font-semibold leading-[140%] text-[#5A5A5A]">
              Persona
            </span>
          </Button>

          <Button
            variant="ghost"
            className="flex h-[49px] w-[49px] flex-col items-center gap-1 rounded-xl p-1 hover:bg-[#F5F5F5]"
          >
            <GitCompare className="h-[26px] w-[26px] text-[#525252]" strokeWidth={1.5} />
            <span className="text-center text-[11px] font-semibold leading-[140%] text-[#5A5A5A]">
              Compare
              <br />
              Models
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
