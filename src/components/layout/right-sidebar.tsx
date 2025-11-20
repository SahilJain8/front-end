
"use client";

import { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronsLeft, Pin, File as FileIcon, Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLayoutContext } from './app-layout';
import { useToast } from "@/hooks/use-toast";
import { PinItem } from '../pinboard/pin-item';

export interface PinType {
    id: string;
    text: string;
    tags: string[];
    notes: string;
    chatId: string;
    time: Date;
    messageId?: string;
}

interface RightSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  pins: PinType[];
  setPins: React.Dispatch<React.SetStateAction<PinType[]>>;
  chatBoards: any[];
}

export function RightSidebar({
  isCollapsed,
  onToggle,
  pins,
  setPins,
  chatBoards
}: RightSidebarProps) {
    const [activeTab, setActiveTab] = useState("pins");
    const { toast } = useToast();
    const layoutContext = useContext(AppLayoutContext);

    const onUpdatePin = (updatedPin: PinType) => {
        setPins(pins.map(p => p.id === updatedPin.id ? updatedPin : p));
    };

    const onRemoveTag = (pinId: string, tagIndex: number) => {
        const updatedPins = pins.map(p => {
            if (p.id === pinId) {
                const newTags = [...p.tags];
                newTags.splice(tagIndex, 1);
                return { ...p, tags: newTags };
            }
            return p;
        });
        setPins(updatedPins);
    };

    return (
        <aside
        className={cn(
            "hidden lg:flex flex-col border-l bg-card/90 backdrop-blur-sm transition-all duration-300 ease-in-out relative shadow-[-12px_0_30px_rgba(15,23,42,0.03)]",
            isCollapsed ? "w-[58px]" : "w-80"
        )}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="absolute top-1/2 -translate-y-1/2 -left-4 bg-card border hover:bg-accent z-10 h-8 w-8 rounded-full"
            >
                <ChevronsLeft
                className={cn("h-4 w-4 transition-transform", !isCollapsed && "rotate-180")}
                />
            </Button>
            
            {isCollapsed ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Pin className="h-5 w-5" />
                    Pins
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="p-4 space-y-4 border-b">
                        <div className="flex items-center gap-2 font-semibold">
                            <Pin className="h-5 w-5" />
                            <span>Pinboard</span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search pins..." className="pl-9 rounded-full h-9" />
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant={activeTab === 'pins' ? 'secondary' : 'ghost'} 
                                className="flex-1 rounded-full"
                                onClick={() => setActiveTab('pins')}>
                                <Pin className="mr-2 h-4 w-4" /> Pins
                            </Button>
                            <Button 
                                variant={activeTab === 'files' ? 'secondary' : 'ghost'} 
                                className="flex-1 rounded-full"
                                onClick={() => setActiveTab('files')}>
                                <FileIcon className="mr-2 h-4 w-4" /> Files
                            </Button>
                        </div>
                         <Select>
                            <SelectTrigger className="w-full rounded-full">
                                <SelectValue placeholder="Filter by Current Chat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="current">Filter by Current Chat</SelectItem>
                                <SelectItem value="all">All Chats</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-4 space-y-3">
                            {pins.length > 0 ? (
                                pins.map(pin => {
                                    const chat = chatBoards.find(c => c.id === pin.chatId);
                                    return (
                                        <PinItem 
                                            key={pin.id} 
                                            pin={pin}
                                            onUpdatePin={onUpdatePin}
                                            onRemoveTag={onRemoveTag}
                                            chatName={chat?.name}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-center text-muted-foreground py-16">
                                    <div className="inline-block p-3 bg-muted rounded-full border mb-4">
                                       <Pin className="h-6 w-6" />
                                    </div>
                                    <p className="font-semibold">No pins yet</p>
                                    <p className="text-sm">Pin useful answers or references from your chats to keep them handy for later.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    
                    <div className="p-4 border-t">
                        <Button variant="outline" className="w-full rounded-full">
                            <Download className="mr-2 h-4 w-4" />
                            Export Pins
                        </Button>
                    </div>
                </div>
            )}
        </aside>
    );
}
