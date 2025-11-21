
"use client";

import Link from "next/link";
import React from 'react';
import {
  Users,
  ChevronsLeft,
  Settings,
  Plus,
  LogOut,
  Search,
  Library,
  MessageSquare,
  Star,
  MoreHorizontal,
  Archive,
  Trash2,
  Share2,
  Pencil,
  Check,
  LayoutDashboard,
  Sparkles,
  Workflow
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import type { ChatBoard } from "./app-layout";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Logo } from "../icons/logo";

interface LeftSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  chatBoards: ChatBoard[];
  setChatBoards: React.Dispatch<React.SetStateAction<ChatBoard[]>>;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  onAddChat: () => void;
  renamingChatId: string | null;
  setRenamingChatId: (id: string | null) => void;
  renamingText: string;
  setRenamingText: (text: string) => void;
  renameInputRef: React.RefObject<HTMLInputElement>;
  handleDeleteClick: (board: ChatBoard) => void;
}

export function LeftSidebar({
  isCollapsed,
  onToggle,
  chatBoards,
  setChatBoards,
  activeChatId,
  setActiveChatId,
  onAddChat,
  renamingChatId,
  setRenamingChatId,
  renamingText,
  setRenamingText,
  renameInputRef,
  handleDeleteClick
}: LeftSidebarProps) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/auth/login');
  };

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setChatBoards(prev => prev.map(board =>
        board.id === id ? { ...board, isStarred: !board.isStarred } : board
    ).sort((a, b) => {
        if (a.isStarred && !b.isStarred) return -1;
        if (!a.isStarred && b.isStarred) return 1;
        return 0;
    }));
  };

  const handleRenameClick = (e: React.MouseEvent, board: ChatBoard) => {
    e.stopPropagation();
    setRenamingChatId(board.id);
    setRenamingText(board.name);
  };

  const handleRenameSave = () => {
    if (renamingChatId) {
        setChatBoards(prev => prev.map(board =>
            board.id === renamingChatId ? { ...board, name: renamingText } : board
        ));
        setRenamingChatId(null);
        setRenamingText("");
    }
  };

  return (
      <aside className={cn(
          "flex flex-col transition-all duration-300 ease-in-out border-r border-sidebar-border relative hidden md:flex h-full overflow-y-auto overflow-x-hidden",
          isCollapsed ? "w-16 items-center" : "w-[240px]"
        )}
        style={{ backgroundColor: '#F5F5F5' }}
        >
        
        <Button variant="ghost" size="icon" onClick={onToggle} className="absolute top-1/2 -translate-y-1/2 -right-4 bg-card border hover:bg-accent z-50 h-8 w-8 rounded-full">
            <ChevronsLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")}/>
        </Button>

        <div className="flex flex-col flex-grow">
            {/* Logo and FlowtingAI text */} 
            <div className={cn("pt-4 pb-2 w-full flex items-center", isCollapsed ? "justify-center" : "justify-start gap-2 pl-4")}> 
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="text-primary h-7 w-7"/> 
                    <h1 className={cn("text-xl font-semibold", isCollapsed && "hidden")}>FlowtingAI</h1> 
                </Link>
            </div>
            <Separator className={cn("w-[210px] bg-[#D9D9D9] h-[1px] mx-auto", isCollapsed && "w-10")} /> 

            <div className={cn("p-4 w-full space-y-2", isCollapsed && "px-2 space-y-2")}>
                {/* Chat Board Button */} 
                <Button 
                    variant="ghost" 
                    className={cn(
                        "w-full justify-start gap-2 rounded-[40px] h-[40px] text-white",
                        isCollapsed ? "justify-center w-auto aspect-square p-0" : "",
                        "bg-[#2C2C2C] hover:bg-[#2C2C2C]/90"
                    )}
                    asChild
                >
                    <Link href="/">
                        <LayoutDashboard className="w-4 h-4" /> 
                        <span className={cn(isCollapsed && "hidden")}>Chat Board</span>
                    </Link>
                </Button>

                {/* Workflows Button (Disabled for now) */} 
                <Button 
                    variant="ghost" 
                    className={cn(
                        "w-full justify-start gap-2 rounded-[40px] h-[40px]",
                        isCollapsed ? "justify-center w-auto aspect-square p-0" : ""
                    )}
                    disabled
                >
                    <Workflow className="w-4 h-4" />
                    <span className={cn(isCollapsed && "hidden")}>Workflows</span>
                </Button>

                {/* AI Automation Button */} 
                <Button 
                    variant="ghost" 
                    className={cn(
                        "w-full justify-start gap-2 rounded-[40px] h-[40px]",
                        isCollapsed ? "justify-center w-auto aspect-square p-0" : ""
                    )}
                >
                    <Sparkles className="w-4 h-4" />
                    <span className={cn(isCollapsed && "hidden")}>AI Automation</span>
                </Button>
            </div>
            
            <Separator className={cn("w-[210px] bg-[#D9D9D9] h-[1px] mx-auto mb-3", isCollapsed ? "w-10 my-2" : "")} /> 

            <div className={cn("space-y-2 flex-1 overflow-y-auto w-full px-2", isCollapsed && "px-1 hidden")}>
                {/* CHAT BOARDS Title */} 
                <h3 
                  className="text-xs font-semibold text-[#757575] mb-2 h-[20px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                > 
                  CHAT BOARDS
                </h3>
                
                {/* Search chats Input */} 
                <div className="relative w-full px-2">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search chats" className="pl-9 bg-white rounded-[25px] h-[38px] w-full" />
                </div>

                {/* Add Chat Board Button */} 
                <div className="px-2">
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "w-full justify-start gap-2 rounded-[40px] h-[32px] text-white mt-2", 
                            isCollapsed ? "justify-center w-auto aspect-square p-0" : "",
                            "bg-[#2C2C2C] hover:bg-[#2C2C2C]/90"
                        )}
                        onClick={onAddChat}
                    >
                        <Plus className="w-4 h-4" /> 
                        <span className={cn(isCollapsed && "hidden")}>Add Chat Board</span>
                    </Button>
                </div>
                
                {/* Chat Boards List */} 
                <div className="space-y-1 px-2">
                    {!isCollapsed && chatBoards.map((board) => (
                      <div
                            key={board.id}
                            className={cn(
                              "w-full h-[40px] py-2 group flex justify-between items-center rounded-[25px] hover:bg-accent cursor-pointer px-2", 
                              activeChatId === board.id ? "bg-secondary text-primary" : "text-muted-foreground",
                            )}
                            onClick={() => setActiveChatId(board.id)}
                          >
                              <div className="flex items-center gap-2 overflow-hidden flex-1">
                                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                                  <div className="flex-grow text-left overflow-hidden">
                                  {renamingChatId === board.id ? (
                                      <div className="flex items-center gap-1">
                                          <Input 
                                              ref={renameInputRef}
                                              value={renamingText}
                                              onChange={(e) => setRenamingText(e.target.value)}
                                              onBlur={handleRenameSave}
                                              onKeyDown={(e) => e.key === 'Enter' && handleRenameSave()}
                                              className="h-7 text-xs rounded-md"
                                          />
                                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleRenameSave}><Check className="h-4 w-4" /></Button>
                                      </div>
                                  ) : (
                                      <>
                                          <p className="truncate w-full text-sm">{board.name}</p>
                                      </>
                                  )}
                                  </div>
                              </div>
                                <div className={"ml-2 flex-shrink-0 flex items-center gap-1"}>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={(e) => toggleStar(e, board.id)}>
                                    <Star className={cn("w-4 h-4 text-muted-foreground", board.isStarred && "text-yellow-400 fill-yellow-400")} />
                                  </Button>
                                  {board.pinCount > 0 && <Badge variant="default" className="rounded-full h-5 w-5 text-[10px] p-0 flex items-center justify-center bg-muted-foreground text-background">{board.pinCount}</Badge>}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={(e) => handleRenameClick(e, board) }><Pencil className="mr-2 h-4 w-4" />Rename</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDeleteClick(board); }}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                        <DropdownMenuItem><Archive className="mr-2 h-4 w-4" />Archive</DropdownMenuItem>
                                        <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                      </div>
                  ))}
                </div>
            </div>

            <div className={cn("p-4 mt-auto w-full", isCollapsed && "p-2 space-y-2")}>
                <Separator className={cn("w-[210px] bg-[#D9D9D9] h-[1px] mx-auto my-4", isCollapsed && "w-10 my-2")} /> 
                <div className={cn("flex items-center", isCollapsed ? "flex-col gap-2" : "justify-between")}>
                <div className={cn("flex items-center gap-2", isCollapsed && "hidden")}>
                    <Avatar className="h-8 w-8">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Avnish Poonia</span>
                </div>
                {isCollapsed && (
                    <Avatar className="h-8 w-8">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                )}
                </div>
                <nav className="space-y-1 mt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={cn("flex items-center gap-2 p-2 rounded-[25px] w-full", isCollapsed ? "justify-center" : "justify-start")}>
                          <Settings />
                          <span className={cn(isCollapsed && "hidden")}>Setting</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={isCollapsed ? "end" : "start"}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        </div>
      </aside>
  );
}
