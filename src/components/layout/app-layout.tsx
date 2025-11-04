import type { ReactNode } from "react";
import { LeftSidebar } from "./left-sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
      <div className="flex min-h-screen bg-card">
          <LeftSidebar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
      </div>
  );
}
