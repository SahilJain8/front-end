"use client";

import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { FlaskConical, Feather, Code } from "lucide-react";

const personas = [
  { name: "Researcher", icon: FlaskConical },
  { name: "Writer", icon: Feather },
  { name: "Technical", icon: Code },
];

export function PersonaSelector() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Personas</SidebarGroupLabel>
      <div className="flex flex-col gap-1">
        {personas.map((persona) => (
          <Button
            key={persona.name}
            variant="ghost"
            className="justify-start gap-2"
          >
            <persona.icon className="w-4 h-4" />
            <span>{persona.name}</span>
          </Button>
        ))}
      </div>
    </SidebarGroup>
  );
}
