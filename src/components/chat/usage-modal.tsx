"use client";


import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface UsageModalProps {
open: boolean;
onOpenChange: (open: boolean) => void;
usagePercent?: number;
}


export default function UsageModal({ open, onOpenChange, usagePercent = 0 }: UsageModalProps) {
return (
<Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent className="max-w-lg">
<DialogHeader>
<DialogTitle>Usage</DialogTitle>
</DialogHeader>
<div className="mt-4">
<p className="text-sm">You have used <strong>{usagePercent}%</strong> of your quota.</p>
<div className="mt-3 h-3 w-full bg-slate-100 rounded-full overflow-hidden">
<div style={{ width: `${Math.min(100, usagePercent)}%` }} className="h-3 bg-primary" />
</div>
<p className="text-xs text-muted-foreground mt-2">Manage usage in the top navbar or upgrade plan to increase quota.</p>
</div>
<DialogFooter className="mt-4">
<Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
</DialogFooter>
</DialogContent>
</Dialog>
);
}