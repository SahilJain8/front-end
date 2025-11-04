
"use client";

import { Button } from "../ui/button";
import { ModelSelector } from "../chat/model-selector";
import { WandSparkles, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { LeftSidebar } from "./left-sidebar";
import { CreatePersonaDialog } from "../personas/create-persona-dialog";

export function Topbar({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const tabs = [
    { name: "Chat Board", href: "/", icon: WandSparkles },
    { name: "AI Automation", href: "/dashboard", icon: WandSparkles },
  ];
  return (
    <header className="flex items-center justify-between p-2 border-b h-[69px] bg-card shrink-0">
      <div className="flex items-center gap-2">
        <LeftSidebar isCollapsed={true} onToggle={() => {}} />
         <Link href="/" className={cn("flex items-center gap-2")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M2 7L12 12M22 7L12 12M12 22V12M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
              <h1 className="text-lg font-semibold hidden md:block">Flowting</h1>
          </Link>
          <nav className="items-center gap-2 hidden md:flex">
            {tabs.map((tab) => (
              <Button
                key={tab.name}
                variant="ghost"
                asChild
                className={cn(
                    "font-semibold",
                    pathname === tab.href ? "bg-accent text-accent-foreground" : ""
                )}
              >
                <Link href={tab.href}>
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </Link>
              </Button>
            ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {children}
         <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" className="rounded-[25px]">Compare models</Button>
            <CreatePersonaDialog />
         </div>
        <ModelSelector />
      </div>
    </header>
  );
}
