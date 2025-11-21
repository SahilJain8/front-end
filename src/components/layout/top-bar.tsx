'use client';

import { Button } from "../ui/button";
import { Files, BarChart2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { CreatePersonaDialog } from "../personas/create-persona-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModelSelector } from "../chat/model-selector";
import { TokenTracker } from "../chat/token-tracker";
import type { AIModel } from "@/types/ai-model";

interface TopbarProps {
  children?: ReactNode;
  selectedModel: AIModel | null;
  onModelSelect: (model: AIModel) => void;
}

export function Topbar({ children, selectedModel, onModelSelect }: TopbarProps) {
  const isMobile = useIsMobile();

  return (
    <header className="flex items-center justify-between p-2 border-b h-[60px] bg-card shrink-0 z-20">
      <div className="flex items-center gap-4">
        {children}

        {/* Add Model Button and Token Count */} 
        <div className={cn("flex items-center gap-2 pl-4", isMobile ? "w-full justify-between" : "")}> {/* Adjusted padding and mobile full width */} 
          <ModelSelector
            selectedModel={selectedModel}
            onModelSelect={onModelSelect}
          />
          {/* TokenTracker with specified width and height for its progress bar */} 
          <div className="w-[122px] h-[6px] flex items-center">
            <TokenTracker />
          </div>
        </div>
      </div>

      {/* Right-aligned buttons */} 
      <div className={cn("flex items-center gap-2 pr-4", isMobile ? "hidden" : "flex")}>
          {/* Files Button */} 
          <Button 
            variant="outline" 
            className="h-[40px] w-[85px] rounded-[40px] gap-2"
          >
            <Files className="h-4 w-4" />
            Files
          </Button>

          {/* Compare Models Button */} 
          <Button 
            variant="outline" 
            className="h-[40px] rounded-[40px] gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            Compare models
          </Button>

          {/* Create Persona Button */} 
          <CreatePersonaDialog>
            <Button 
              className="h-[40px] w-[165px] rounded-[40px] gap-2 text-white bg-[#767676] hover:bg-[#767676]/90"
            >
              <UserPlus className="h-4 w-4" />
              Create Persona
            </Button>
          </CreatePersonaDialog>
      </div>
    </header>
  );
}
