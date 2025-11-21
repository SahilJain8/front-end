
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FolderPlus, Pin as PinIcon, Folder, Unlink, Move, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { PinType } from "../layout/right-sidebar";
import { OrganizePinItem } from "./organize-pin-item";

interface Folder {
  id: string;
  name: string;
}

interface OrganizePinsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pins: PinType[];
  onPinsUpdate: (pins: PinType[]) => void;
}

const initialFolders: Folder[] = [
  { id: "unorganized", name: "Unorganized Pins" },
  { id: "research", name: "Research" },
];

export function OrganizePinsDialog({ isOpen, onClose, pins: initialPins, onPinsUpdate }: OrganizePinsDialogProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [currentPins, setCurrentPins] = useState(initialPins);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("unorganized");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedPinIds, setSelectedPinIds] = useState<string[]>([]);

  useEffect(() => {
    setCurrentPins(initialPins);
  }, [initialPins]);

  const pinsByFolder = useMemo(() => {
    const grouped: Record<string, PinType[]> = {};
    folders.forEach(folder => {
        grouped[folder.id] = [];
    });
    
    currentPins.forEach(pin => {
      const folderId = pin.folderId || "unorganized";
      if (!grouped[folderId]) {
        // This can happen if a pin's folderId doesn't exist in the folders list
        // For now, let's add it to unorganized
        grouped["unorganized"].push(pin);
      } else {
        grouped[folderId].push(pin);
      }
    });

    return grouped;

  }, [currentPins, folders]);

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedFolder = folders.find(f => f.id === selectedFolderId);
  const pinsInSelectedFolder = selectedFolderId ? pinsByFolder[selectedFolderId] : [];

  const handleCreateFolder = () => {
    if (newFolderName.trim() !== "") {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setIsCreatingFolder(false);
    }
  };

  const handlePinUpdate = (updatedPin: PinType) => {
    const newPins = currentPins.map(p => p.id === updatedPin.id ? updatedPin : p);
    setCurrentPins(newPins);
  };

  const handleMovePins = (targetFolderId: string) => {
    const newPins = currentPins.map(pin => 
        selectedPinIds.includes(pin.id) 
            ? { ...pin, folderId: targetFolderId } 
            : pin
    );
    setCurrentPins(newPins);
    setSelectedPinIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedPinIds.length === pinsInSelectedFolder.length) {
        setSelectedPinIds([]);
    } else {
        setSelectedPinIds(pinsInSelectedFolder.map(p => p.id));
    }
  };

  const handleSelectionChange = (pinId: string, selected: boolean) => {
    if (selected) {
        setSelectedPinIds(prev => [...prev, pinId]);
    } else {
        setSelectedPinIds(prev => prev.filter(id => id !== pinId));
    }
  }

  const handleSaveChanges = () => {
    onPinsUpdate(currentPins);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ width: '675px', height: '685px', borderRadius: '1rem' }} className="p-0 flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-left">Organize Pins</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[220px_1fr] overflow-hidden">
          {/* Left Section (Folders) */}
          <div className="bg-[#F5F5F5] dark:bg-muted/30 flex flex-col border-r overflow-y-auto">
            <div className="p-4 space-y-3 border-b">
                <h3 className="text-sm font-semibold text-muted-foreground">Folders</h3>
                <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search Folder" 
                            className="pl-8 h-9 rounded-lg bg-white"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" style={{ backgroundColor: '#E0E0E0' }} onClick={() => setIsCreatingFolder(true)}>
                        <FolderPlus className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {isCreatingFolder && (
                  <div className="p-2 bg-white rounded-lg shadow">
                    <Input
                      placeholder="New folder name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="h-9 rounded-md bg-gray-100 mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="rounded-md" onClick={() => setIsCreatingFolder(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" className="rounded-md" onClick={handleCreateFolder} style={{ backgroundColor: '#2C2C2C', color: 'white' }}>
                        Create
                      </Button>
                    </div>
                  </div>
                )}
                {filteredFolders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolderId(folder.id)}
                    className={cn(
                      "w-full flex items-center justify-between text-left p-2 rounded-lg text-sm transition-colors",
                      selectedFolderId === folder.id
                        ? "bg-black/5 dark:bg-white/10 text-primary font-semibold"
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-2">
                        {folder.id === 'unorganized' ? <Unlink className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
                        <span className="truncate">{folder.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {pinsByFolder[folder.id]?.length || 0}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Section (Pins) */}
          <div className="flex flex-col bg-white dark:bg-background">
              <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-semibold">{selectedFolder?.name || 'Pins'}</h3>
                  {selectedPinIds.length > 0 && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-lg">
                                <Move className="h-4 w-4 mr-2"/>
                                Move To
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-0">
                            {folders.map(f => (
                                <div key={f.id} onClick={() => handleMovePins(f.id)} className="p-2 hover:bg-accent cursor-pointer">
                                    {f.name}
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                  )}
              </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {pinsInSelectedFolder && pinsInSelectedFolder.length > 0 ? (
                    <div>
                         <div className="flex items-center pb-2">
                            <Checkbox 
                                checked={selectedPinIds.length === pinsInSelectedFolder.length && pinsInSelectedFolder.length > 0}
                                onCheckedChange={toggleSelectAll}
                                className="mr-3 rounded-[4px]"
                            />
                            <span className="text-sm text-muted-foreground">Select All</span>
                        </div>
                        {pinsInSelectedFolder.map(pin => (
                            <OrganizePinItem 
                                key={pin.id} 
                                pin={pin} 
                                onUpdate={handlePinUpdate}
                                isSelected={selectedPinIds.includes(pin.id)}
                                onSelectionChange={(selected) => handleSelectionChange(pin.id, selected)}
                            />
                        ))}
                    </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-20">
                    <PinIcon className="w-10 h-10 mb-4" />
                    <p className="font-semibold text-lg text-foreground">No pins yet</p>
                    <p className="max-w-xs">
                      Pin useful answers or references from your chats to keep them handy for later.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="p-4 border-t justify-end">
          <Button variant="ghost" onClick={onClose} className="rounded-lg">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} style={{ backgroundColor: '#2C2C2C', color: 'white' }} className="rounded-lg">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
