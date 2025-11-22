
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ModelSelectorDialog } from "./model-selector-dialog";
import { Button } from "../ui/button";
import type { AIModel } from "@/types/ai-model";
import { getModelIcon } from "@/lib/model-icons";

interface ModelSelectorProps {
  selectedModel: AIModel | null;
  onModelSelect: (model: AIModel) => void;
}

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleModelSelect = (model: AIModel) => {
    onModelSelect(model);
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        className="group relative inline-flex items-center gap-[6px] rounded-full bg-[#171717] px-[6px] py-[3px] transition-colors hover:bg-[#0F0F0F]"
        onClick={() => setIsDialogOpen(true)}
      >
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white">
          <img
            src={getModelIcon(
              selectedModel?.companyName,
              selectedModel?.modelName
            )}
            alt="Model icon"
            className="h-4 w-4"
          />
        </span>
        <span className="text-[16px] leading-tight font-normal text-white">
          {selectedModel ? selectedModel.modelName : "Select model"}
        </span>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/40 bg-[#0F0F0F]">
          <ChevronDown className="h-4 w-4 text-white" strokeWidth={2} />
        </span>
      </button>
      <ModelSelectorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onModelSelect={handleModelSelect}
      />
    </>
  );
}
