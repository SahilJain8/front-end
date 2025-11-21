

"use client";


import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";


interface PersonaModalProps {
open: boolean;
onOpenChange: (open: boolean) => void;
}


const personas = [
{ id: 'researcher', name: 'Researcher', desc: 'Analytical and concise' },
{ id: 'writer', name: 'Creative Writer', desc: 'Imaginative and descriptive' },
{ id: 'technical', name: 'Technical Expert', desc: 'Precise and formal' },
];


export default function PersonaModal({ open, onOpenChange }: PersonaModalProps) {
const handleSelect = (id: string) => {
// TODO: wire selection back to parent via context or callback
onOpenChange(false);
};


return (
<Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent className="max-w-2xl">
<DialogHeader>
<DialogTitle>Choose a Persona</DialogTitle>
</DialogHeader>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
{personas.map((p) => (
<div key={p.id} className="p-4 border rounded-lg hover:shadow-md">
<div className="flex items-center gap-3">
<div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
<UserCircle className="h-6 w-6 text-gray-500" />
</div>
<div>
<div className="font-semibold">{p.name}</div>
<div className="text-xs text-muted-foreground">{p.desc}</div>
</div>
</div>
<div className="mt-3 flex justify-end">
<Button onClick={() => handleSelect(p.id)}>Select</Button>
</div>
</div>
))}
</div>
<DialogFooter className="mt-4">
<Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
</DialogFooter>
</DialogContent>
</Dialog>
);
}