
"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
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
      <Button 
        className="h-[40px] w-[131px] rounded-[40px] gap-2 text-white"
        style={{ backgroundColor: '#2C2C2C' }}
        onClick={() => setIsDialogOpen(true)}
      >
        <ChevronsUpDown className="w-4 h-4 text-white" />
        {selectedModel && (
          <img
            src={getModelIcon(selectedModel.companyName)}
            alt={`${selectedModel.modelName} icon`}
            className="h-5 w-5"
          />
        )}
        <span>{selectedModel ? selectedModel.modelName : "Add Model"}</span>
      </Button>
      <ModelSelectorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onModelSelect={handleModelSelect}
      />
    </>
  );
}
