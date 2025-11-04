
'use client';
import type { ReactNode } from "react";
import React, { useState } from "react";
import { LeftSidebar } from "./left-sidebar";
import { RightSidebar } from "./right-sidebar";
import { ChatListSidebar } from "./chat-list-sidebar";
import { Topbar } from "./top-bar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const mainContent = React.cloneElement(children as React.ReactElement, {
      isRightSidebarVisible,
      setIsRightSidebarVisible
  });

  if (isMobile) {
    return (
        <div className="flex flex-col h-screen bg-card w-full">
            <header className="flex items-center justify-between p-2 border-b h-[69px] bg-card shrink-0">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 flex gap-0 w-[80vw]">
                         <LeftSidebar 
                            isCollapsed={false}
                            onToggle={() => {}}
                        />
                        <ChatListSidebar />
                    </SheetContent>
                </Sheet>
                 <Link href="/" className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 7L12 12M22 7L12 12M12 22V12M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <h1 className="text-lg font-semibold">Flowting</h1>
                </Link>
                <div />
            </header>
             <main className="flex-1 flex flex-col min-w-0">
                {mainContent}
            </main>
        </div>
    )
  }

  return (
      <div className="flex flex-col h-screen bg-card w-full">
          <Topbar />
          <div className="flex flex-1 overflow-hidden">
            <LeftSidebar 
                isCollapsed={isLeftSidebarCollapsed}
                onToggle={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
            />
            <ChatListSidebar />
            <main className="flex-1 flex flex-col min-w-0">
                {mainContent}
            </main>
            <RightSidebar
                isVisible={isRightSidebarVisible}
                onClose={() => setIsRightSidebarVisible(false)}
            />
          </div>
      </div>
  );
}

