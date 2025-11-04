"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";

const models = [
  { name: "Gemini 2.5 Flash", credits: "1M tokens" },
  { name: "Model B", credits: "500K tokens" },
  { name: "Model C", credits: "2M tokens" },
];

export function ModelSelector() {
  return (
    <Select defaultValue={models[0].name}>
      <SelectTrigger className="w-auto gap-2">
        <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Models</SelectLabel>
          {models.map((model) => (
            <SelectItem key={model.name} value={model.name}>
              <div className="flex justify-between items-center w-full">
                <span>{model.name}</span>
                <span className="text-xs text-muted-foreground ml-4">{model.credits}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
