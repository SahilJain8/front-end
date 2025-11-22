"use client";

import React from "react";
import {
  ChevronsLeft,
  Settings,
  Plus,
  LogOut,
  MessageSquare,
  Pin,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { ChatBoard } from "./app-layout";
import { useAuth } from "@/context/auth-context";

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
  handleDeleteClick,
}: LeftSidebarProps) {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth/login");
  };

  // Logo component
  const brandMark = (
    <div className="relative flex h-[30.341px] w-[30.341px] flex-shrink-0 items-center justify-center">
      <Image
        src="/icons/logo.png"
        alt="FlowtingAi Logo"
        width={31}
        height={31}
        className="h-[30.341px] w-[30.341px] object-contain"
        priority
      />
    </div>
  );

  // Collapsed sidebar
  if (isCollapsed) {
    return (
      <aside className="relative hidden h-full w-16 flex-col items-center border-r border-[#D9D9D9] bg-[#F5F5F5] md:flex">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute top-1/2 -translate-y-1/2 right-[-14px] z-10 h-8 w-8 rounded-full border border-[#D9D9D9] bg-white shadow"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9D9D9] bg-white">
            <Image
              src="/icons/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-2xl border border-[#D9D9D9] bg-transparent hover:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => {
              if (chatBoards.length > 0) {
                setActiveChatId(chatBoards[0].id);
              }
            }}
          >
            <img
              src="/icons/chatboard.svg"
              alt="Chat board"
              className="h-5 w-5"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-2xl border border-[#D9D9D9] bg-transparent hover:bg-transparent active:bg-transparent disabled:bg-transparent disabled:opacity-100"
            disabled
          >
            <img
              src="/icons/workflow.svg"
              alt="Workflows"
              className="h-5 w-5"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-2xl border border-[#D9D9D9] bg-transparent hover:bg-transparent active:bg-transparent"
          >
            <img
              src="/icons/aiautomation.svg"
              alt="AI Automation"
              className="h-5 w-5"
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto h-10 w-10 rounded-2xl border border-[#D9D9D9] bg-transparent hover:bg-transparent active:bg-transparent"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    );
  }

  // Expanded sidebar
  return (
    <aside className="relative hidden h-full w-[240px] flex-col justify-between border-r border-[#D9D9D9] bg-[#F5F5F5] md:flex">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute top-1/2 -translate-y-1/2 right-[-14px] z-10 h-8 w-8 rounded-full border border-[#D9D9D9] bg-white shadow"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      {/* Main content */}
      <div className="px-4 pt-2 pb-2">
        {/* 1) Logo row */}
        <div className="flex h-[57px] items-center gap-[7.855px]">
          {brandMark}
          <span className="font-display text-[28px] font-normal leading-tight text-[#1E1E1E]">
            FlowtingAi
          </span>
        </div>

        {/* 2) Divider */}
        <div className="mb-4 h-px w-full bg-[#D9D9D9]" />

        {/* 3) Main nav buttons */}
        <div className="flex flex-col gap-4">
          {/* Primary dark button - Chat Board */}
          <Button
            className="flex h-[45px] w-full items-center justify-start gap-2 rounded-[16px] border border-[#FEE9E7] bg-[#2C2C2C] px-3 text-[16px] font-normal text-[#F5F5F5] hover:bg-[#2C2C2C]/90"
            onClick={() => {
              // Start a brand-new chat
              onAddChat();
              router.push('/');
            }}
          >
            <img
              src="/icons/chatboard.svg"
              alt="Chat board"
              className="h-4 w-4"
            />
            Chat Board
          </Button>

          {/* Secondary button - Workflows (disabled/coming soon) */}
          <div className="relative flex h-[45px] w-full items-center justify-start gap-2 rounded-[8px] px-3 text-[16px] font-normal text-[#303030] opacity-30">
            <img
              src="/icons/workflow.svg"
              alt="Workflows"
              className="h-4 w-4"
            />
            Workflows
            <div className="ml-auto rounded-[5px] border border-[#E5E5E5] bg-white/10 px-[5px] py-[2px] text-center text-[12px] font-medium leading-[150%] tracking-[0.02em] text-[#0A0A0A]">
              Coming soon
            </div>
          </div>

          {/* Secondary button - Ai Automation (disabled/coming soon) */}
          <div className="relative flex h-[45px] w-full items-center justify-start gap-2 rounded-[8px] px-3 text-[16px] font-normal text-[#303030] opacity-30">
            <img
              src="/icons/aiautomation.svg"
              alt="AI Automation"
              className="h-4 w-4"
            />
            Ai Automation
            <div className="ml-auto rounded-[5px] border border-[#E5E5E5] bg-white/10 px-[5px] py-[2px] text-center text-[12px] font-medium leading-[150%] tracking-[0.02em] text-[#0A0A0A]">
              Coming soon
            </div>
          </div>
        </div>

        {/* 4) Divider */}
        <div className="mt-4 h-px w-full bg-[#D9D9D9]" />

        {/* 5) "Recent Chat boards" section */}
        <div className="mt-4">
          {/* Section header - accordion trigger style */}
          <div className="flex h-[31px] w-full items-center gap-2 rounded-[8px] px-0 py-[15.5px]">
            <span className="flex-1 text-[14px] font-medium leading-[150%] tracking-[0.01em] text-[#0A0A0A]">
              Recent Chat boards
            </span>
            <div className="h-4 w-4 opacity-30">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {chatBoards.length > 0 ? (
            <div className="mt-2 max-h-[420px] space-y-3 overflow-y-auto pr-2">
              {chatBoards.map((board) => {
                const isActive = activeChatId === board.id;
                const pinTotal =
                  board.pinCount ?? board.metadata?.pinCount ?? 0;
                return (
                  <div
                    key={board.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setActiveChatId(board.id);
                      router.push("/");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveChatId(board.id);
                        router.push("/");
                      }
                    }}
                    className={cn(
                      "w-full rounded-2xl border border-transparent px-4 py-3 text-left transition-all cursor-pointer",
                      isActive
                        ? "bg-[#1E1E1E] text-white shadow-md"
                        : "bg-[#F9F9F9] text-[#1E1E1E] hover:border-[#D9D9D9]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p
                            className={cn(
                              "truncate text-[15px] font-medium",
                            isActive ? "text-white" : "text-[#0A0A0A]"
                          )}
                        >
                          {board.name}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            isActive ? "text-white/70" : "text-[#6F6F6F]"
                          )}
                        >
                          Updated {board.time}
                        </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-xs">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5",
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-white text-[#1E1E1E]"
                          )}
                        >
                          {(board.metadata?.messageCount ?? 0).toLocaleString()} msgs
                        </span>
                          <span
                            className={cn(
                              "flex items-center gap-1 rounded-full px-2 py-0.5",
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-white text-[#1E1E1E]"
                          )}
                            >
                              <Pin className="h-3 w-3" />
                              {pinTotal.toLocaleString()} pins
                            </span>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteClick(board);
                            }}
                            className={cn(
                              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]",
                              isActive
                                ? "bg-white/10 text-white hover:bg-white/20"
                                : "bg-[#F0F0F0] text-[#1E1E1E] hover:bg-[#E0E0E0]"
                            )}
                            title="Delete chat"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="mt-[141px] flex w-full flex-col items-center gap-[18px] text-center">
              <div className="flex h-8 w-8 items-center justify-center">
                <MessageSquare className="h-8 w-8 text-[#333333]" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-normal leading-[129%] text-[#333333]">
                Start a new chat, switch models, or upload your files to get instant insights.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 5) User footer */}
      <div className="border-t border-[#D9D9D9] px-3 py-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-[22px] w-[22px] rounded-full">
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt="User avatar"
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "AP"}
            </AvatarFallback>
          </Avatar>
          <span className="text-[16px] font-normal text-[#1E1E1E]">
            {user?.name || "Avnish Poonia"}
          </span>
        </div>

        {/* Settings dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="mt-1 flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm hover:bg-[#EDEDED]"
            >
              <span className="flex items-center gap-2 text-[#1E1E1E]">
                <Settings className="h-4 w-4" />
                Settings
              </span>
              <ChevronsLeft className="h-4 w-4 rotate-180 text-[#757575]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="start">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
