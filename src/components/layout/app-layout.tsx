
'use client';
import type { ReactNode } from "react";
import React, { useState, createContext, useEffect, useCallback, useRef } from "react";
import { LeftSidebar } from "./left-sidebar";
import { RightSidebar, type PinType } from "./right-sidebar";
import { Topbar } from "./top-bar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "../chat/chat-message";
import { useRouter, usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AppLayoutProps {
  children: React.ReactElement;
}

export type ChatBoard = {
    id: number;
    name:string;
    time: string;
    isStarred: boolean;
    pinCount: number;
};

const initialChatBoards: ChatBoard[] = [
    { id: 1, name: "Product Analysis Q4", time: "2m", isStarred: true, pinCount: 0 },
    { id: 2, name: "Competitive Landscape", time: "1 Day", isStarred: false, pinCount: 0 },
    { id: 3, name: "Marketing Campaign Ideas", time: "1 month", isStarred: false, pinCount: 0 },
];

type ChatHistory = {
  [key: number]: Message[];
}

const initialChatHistory: ChatHistory = {
    1: [],
    2: [],
    3: [],
}

interface AppLayoutContextType {
    chatBoards: ChatBoard[];
    setChatBoards: React.Dispatch<React.SetStateAction<ChatBoard[]>>;
    activeChatId: number | null;
    setActiveChatId: (id: number) => void;
    pins: PinType[];
    onPinMessage: (pin: PinType) => void;
    onUnpinMessage: (pinId: string) => void;
    handleAddChat: () => void;
}

export const AppLayoutContext = createContext<AppLayoutContextType | null>(null);

export default function AppLayout({ children }: AppLayoutProps) {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [pins, setPins] = useState<PinType[]>([]);
  const [chatBoards, setChatBoards_] = useState<ChatBoard[]>(initialChatBoards);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [chatHistory, setChatHistory] = useState<ChatHistory>(initialChatHistory);

  const [chatToDelete, setChatToDelete] = useState<ChatBoard | null>(null);
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null);
  const [renamingText, setRenamingText] = useState("");
  const renameInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (renamingChatId && renameInputRef.current) {
        renameInputRef.current.focus();
    }
  }, [renamingChatId]);

  const handleDeleteClick = (board: ChatBoard) => {
    setChatToDelete(board);
  };
  
  const confirmDelete = () => {
    if (chatToDelete) {
        setChatBoards_(prev => prev.filter(board => board.id !== chatToDelete.id));

        if (activeChatId === chatToDelete.id) {
            const newActiveChat = chatBoards.find(b => b.id !== chatToDelete.id);
            setActiveChatId(newActiveChat ? newActiveChat.id : 0);
        }
        setChatToDelete(null);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !pathname.startsWith('/auth')) {
        router.replace('/auth/login');
    }
  }, [pathname, router]);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedChatBoards = localStorage.getItem('chatBoards');
      const savedChatHistory = localStorage.getItem('chatHistory');
      const savedPins = localStorage.getItem('pins');
      const savedActiveChatId = localStorage.getItem('activeChatId');

      if (savedChatBoards) setChatBoards_(JSON.parse(savedChatBoards));
      if (savedChatHistory) setChatHistory(JSON.parse(savedChatHistory));
      if (savedPins) setPins(JSON.parse(savedPins).map((p: PinType) => ({...p, time: new Date(p.time)})) ); // Re-hydrate dates
      if (savedActiveChatId) setActiveChatId(JSON.parse(savedActiveChatId));

    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
        localStorage.setItem('chatBoards', JSON.stringify(chatBoards));
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        localStorage.setItem('pins', JSON.stringify(pins));
        if (activeChatId) {
            localStorage.setItem('activeChatId', JSON.stringify(activeChatId));
        }
    } catch (error) {
        console.error("Failed to save state to localStorage", error);
    }
  }, [chatBoards, chatHistory, pins, activeChatId]);


  const setMessagesForActiveChat = (messages: Message[] | ((prev: Message[]) => Message[])) => {
    if (activeChatId) {
      setChatHistory(prev => ({ ...prev, [activeChatId]: typeof messages === 'function' ? messages(prev[activeChatId] || []) : messages }));
    }
  };
  
  const handlePinMessage = (pin: PinType) => {
    setPins(prevPins => [pin, ...prevPins]);
    setChatBoards_(prevBoards => 
        prevBoards.map(board => {
            if (board.id.toString() === pin.chatId) {
                return { ...board, pinCount: (board.pinCount || 0) + 1 };
            }
            return board;
        })
    );
  };

  const handleUnpinMessage = (messageId: string) => {
    const pinToRemove = pins.find(p => p.id === messageId);
    if (!pinToRemove) return;

    setPins(prevPins => prevPins.filter(p => p.id !== messageId));

    setChatBoards_(prevBoards => 
        prevBoards.map(board => {
            if (board.id.toString() === pinToRemove.chatId) {
                return { ...board, pinCount: Math.max(0, (board.pinCount || 1) - 1) };
            }
            return board;
        })
    );
  };

  const handleAddChat = () => {
    const newChatId = Date.now();
    const newChat: ChatBoard = {
        id: newChatId,
        name: "New Chat",
        time: "1m",
        isStarred: false,
        pinCount: 0
    };
    setChatBoards_(prev => [newChat, ...prev]);
    setChatHistory(prev => ({...prev, [newChatId]: []}));
    setActiveChatId(newChatId);
    router.push('/');
  };
  
  const contextValue: AppLayoutContextType = {
    chatBoards,
    setChatBoards: setChatBoards_,
    activeChatId,
    setActiveChatId,
    pins,
    onPinMessage: handlePinMessage,
    onUnpinMessage: handleUnpinMessage,
    handleAddChat,
  };

  const pageContentProps = {
    onPinMessage: handlePinMessage,
    onUnpinMessage: handleUnpinMessage,
    messages: (activeChatId && chatHistory[activeChatId]) || [],
    setMessages: setMessagesForActiveChat
  };
  
  const pageContent = React.cloneElement(children, pageContentProps);

  const sidebarProps = {
    isCollapsed: isLeftSidebarCollapsed,
    onToggle: () => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed),
    chatBoards: chatBoards,
    setChatBoards: setChatBoards_,
    activeChatId: activeChatId,
    setActiveChatId: setActiveChatId,
    onAddChat: handleAddChat,
    renamingChatId: renamingChatId,
    setRenamingChatId: setRenamingChatId,
    renamingText: renamingText,
    setRenamingText: setRenamingText,
    renameInputRef: renameInputRef,
    handleDeleteClick: handleDeleteClick,
  };

  if (isMobile) {
    return (
        <AppLayoutContext.Provider value={contextValue}>
            <div className="flex flex-col h-screen bg-background w-full">
                <Topbar>
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 flex gap-0 w-[80vw]">
                             <LeftSidebar {...sidebarProps} isCollapsed={false} />
                        </SheetContent>
                    </Sheet>
                </Topbar>
                 <main className="flex-1 flex flex-col min-w-0">
                    {pageContent}
                </main>
            </div>
            <AlertDialog open={!!chatToDelete} onOpenChange={(open) => !open && setChatToDelete(null)}>
              <AlertDialogContent className="rounded-[25px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this chat board.
                  </AlertDialogDescription>
                  {chatToDelete && chatToDelete.pinCount > 0 && (
                      <p className="text-sm font-semibold text-destructive mt-2">This chat board has {chatToDelete.pinCount} pinned message(s).</p>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-[25px]" onClick={() => setChatToDelete(null)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="rounded-[25px]" onClick={confirmDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </AppLayoutContext.Provider>
    )
  }

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <div className="flex flex-col h-screen bg-background w-full">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar {...sidebarProps} />
          <main className="flex-1 flex flex-col min-w-0">
              {pageContent}
          </main>
          <RightSidebar
              isCollapsed={isRightSidebarCollapsed}
              onToggle={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
              pins={pins}
              setPins={setPins}
              chatBoards={chatBoards}
          />
        </div>
      </div>
      <AlertDialog open={!!chatToDelete} onOpenChange={(open) => !open && setChatToDelete(null)}>
        <AlertDialogContent className="rounded-[25px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this chat board.
            </AlertDialogDescription>
            {chatToDelete && chatToDelete.pinCount > 0 && (
                <p className="text-sm font-semibold text-destructive mt-2">This chat board has {chatToDelete.pinCount} pinned message(s).</p>
              )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[25px]" onClick={() => setChatToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="rounded-[25px]" onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayoutContext.Provider>
  );
}
