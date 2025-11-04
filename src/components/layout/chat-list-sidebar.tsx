
"use client";

import {
  MessageSquare,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const chatBoards = [
    { name: "Product Analysis Q4", time: "2m", isStarred: true, pinCount: 3 },
    { name: "Product Analysis Q1", time: "2m", isStarred: false, pinCount: 0 },
    { name: "Competitive Landscape is shifting towards AI-driven features", time: "1 Day", isStarred: true, pinCount: 1 },
    { name: "Q3 Earnings Call Prep", time: "1 month", isStarred: false, pinCount: 0 },
    { name: "User Feedback Synthesis", time: "1 month", isStarred: false, pinCount: 0 },
    { name: "Marketing Campaign Ideas", time: "1 month", isStarred: true, pinCount: 5 },
    { name: "API Integration Plan for the new mobile application", time: "2 months", isStarred: false, pinCount: 0 },
    { name: "Onboarding Flow UX", time: "2 months", isStarred: false, pinCount: 0 },
    { name: "Website Redesign Brainstorm", time: "3 months", isStarred: false, pinCount: 0 },
];

interface ChatListSidebarProps {
  isLeftSidebarCollapsed: boolean;
}

export function ChatListSidebar({ isLeftSidebarCollapsed }: ChatListSidebarProps) {
  
  if (isLeftSidebarCollapsed) {
    return null;
  }

  return (
    <aside className="w-72 bg-card text-card-foreground flex flex-col border-r">
      <div className="p-4 border-b w-full">
        <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Chat Board</span>
        </Button>
        <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Ctrl+K" className="pl-9 bg-background" />
        </div>
      </div>
      <div className="space-y-2 p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-muted-foreground px-2">CHAT BOARDS</h3>
          <div className="space-y-1">
              {chatBoards.map((board, index) => (
                  <Button
                       key={index}
                       variant="ghost"
                       className="w-full h-auto py-2 group flex justify-between items-center"
                      >
                          <div className="flex items-center gap-2 overflow-hidden">
                              <MessageSquare className="w-5 h-5 flex-shrink-0" />
                              <div className="flex-grow text-left overflow-hidden">
                                  <p className="truncate w-full">{board.name}</p>
                                  <p className="text-xs text-muted-foreground">{board.time}</p>
                              </div>
                          </div>
                           <div className="ml-2 flex-shrink-0 flex flex-col items-center gap-0.5">
                             {board.isStarred && <Star className="w-4 h-4 text-blue-400 fill-blue-400" />}
                             {board.pinCount > 0 && <Badge variant="default" className="rounded-full h-[18px] w-[18px] text-[10px] p-0 flex items-center justify-center bg-blue-400 text-white dark:text-black">{board.pinCount}</Badge>}
                          </div>
                  </Button>
              ))}
          </div>
      </div>
    </aside>
  );
}
