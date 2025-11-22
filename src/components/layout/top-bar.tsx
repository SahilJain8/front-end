'use client';

import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { CreatePersonaDialog } from "../personas/create-persona-dialog";
import { ModelSelector } from "../chat/model-selector";
import { TokenTracker } from "../chat/token-tracker";
import type { AIModel } from "@/types/ai-model";

interface TopbarProps {
  children?: ReactNode;
  selectedModel: AIModel | null;
  onModelSelect: (model: AIModel) => void;
}

export function Topbar({ children, selectedModel, onModelSelect }: TopbarProps) {
  return (
    <header className="w-full bg-white border-b border-[#D9D9D9] flex justify-center">
      <div className="flex h-[57px] w-full max-w-[1200px] flex-shrink-0 items-center justify-between px-2 py-2 lg:px-4">
        {/* Left side: Active model pill + Token meter */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {children}
          <ModelSelector
            selectedModel={selectedModel}
            onModelSelect={onModelSelect}
          />
          <TokenTracker />
          <Button
            variant="secondary"
            className="h-9 rounded-full bg-[#F5F5F5] px-4 text-sm font-medium text-[#1E1E1E] hover:bg-[#E5E5E5]"
          >
            Upgrade Plan
          </Button>
        </div>

        {/* Right side: Create Persona button */}
        <div className="flex items-center gap-[26px] ml-2">
          <CreatePersonaDialog />
        </div>
      </div>
    </header>
  );
}
