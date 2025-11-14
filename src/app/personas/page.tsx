
'use client';

import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { PersonaCard } from "@/components/personas/persona-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Persona } from "@/components/personas/persona-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const personas: Persona[] = [
    {
      name: 'Elena',
      title: 'UX Advisor',
      description: 'Senior product manager with 10 years of UX research experience',
      avatarUrl: PlaceHolderImages.find(p => p.id === 'asha-avatar')?.imageUrl ?? '',
      avatarHint: PlaceHolderImages.find(p => p.id === 'asha-avatar')?.imageHint ?? '',
      tags: ['Empathetic', 'Temp: 2.1'],
      expertise: ['UX Research', 'Product Design', 'User Testing', 'Data Analysis', 'Figma'],
      personality: ['Patient', 'Analytical', 'Creative'],
    },
    {
      name: 'Marcus',
      title: 'Developer Mentor',
      description: 'Full-stack developer specializing in modern web technologies',
      avatarUrl: PlaceHolderImages.find(p => p.id === 'codementor-avatar')?.imageUrl ?? '',
      avatarHint: PlaceHolderImages.find(p => p.id === 'codementor-avatar')?.imageHint ?? '',
      tags: ['Technical', 'Temp: 2.1'],
      expertise: ['JavaScript', 'React', 'Node.js'],
      personality: ['Decisive', 'Patient', 'Analytical'],
    },
    {
      name: 'Chloe',
      title: 'Creative Coach',
      description: 'Award-winning creative director with expertise in branding and storytelling',
      avatarUrl: PlaceHolderImages.find(p => p.id === 'luna-avatar')?.imageUrl ?? '',
      avatarHint: PlaceHolderImages.find(p => p.id === 'luna-avatar')?.imageHint ?? '',
      tags: ['Witty', 'Temp: 2.1'],
      expertise: ['Branding', 'Storytelling', 'Design', 'Copywriting'],
      personality: ['Creative', 'Humorous', 'Decisive'],
    },
     {
      name: 'Aria',
      title: 'UX Advisor',
      description: 'Senior product manager with 10 years of UX research experience',
      avatarUrl: PlaceHolderImages.find(p => p.id === 'asha-avatar')?.imageUrl ?? '',
      avatarHint: PlaceHolderImages.find(p => p.id === 'asha-avatar')?.imageHint ?? '',
      tags: ['Empathetic', 'Temp: 2.1'],
      expertise: ['UX Research', 'Product Design', 'User Testing'],
      personality: ['Patient', 'Analytical', 'Creative'],
    },
    {
      name: 'Devin',
      title: 'Developer Mentor',
      description: 'Full-stack developer specializing in modern web technologies',
      avatarUrl: PlaceHolderImages.find(p => p.id === 'codementor-avatar')?.imageUrl ?? '',
      avatarHint: PlaceHolderImages.find(p => p.id === 'codementor-avatar')?.imageHint ?? '',
      tags: ['Technical', 'Temp: 2.1'],
      expertise: ['JavaScript', 'React', 'Node.js', 'Python', 'DevOps'],
      personality: ['Decisive', 'Patient', 'Analytical'],
    },
    {
      name: 'Isla',
      title: 'Creative Coach',
      description: 'Award-winning creative director with expertise in branding and storytelling',
      avatarUrl: PlaceHolderImages.find(p => p.id === 'luna-avatar')?.imageUrl ?? '',
      avatarHint: PlaceHolderImages.find(p => p.id === 'luna-avatar')?.imageHint ?? '',
      tags: ['Witty', 'Temp: 2.1'],
      expertise: ['Branding', 'Storytelling', 'Design'],
      personality: ['Creative', 'Humorous', 'Decisive'],
    },
];

function StackedAvatars() {
    const avatarData = [
        PlaceHolderImages.find(p => p.id === 'codementor-avatar'),
        PlaceHolderImages.find(p => p.id === 'asha-avatar'),
        PlaceHolderImages.find(p => p.id === 'luna-avatar'),
    ];

    return (
        <div className="flex -space-x-3 overflow-hidden">
            {avatarData.map((avatar, index) => (
                avatar && <Avatar key={index} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={avatar.imageUrl} alt="User Avatar" data-ai-hint={avatar.imageHint} />
                    <AvatarFallback>{avatar.id.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            ))}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">
                +1
            </div>
        </div>
    );
}


function PersonasPageContent() {
    const stats = [
        { value: "5", label: "Total Personas" },
        { value: "24", label: "Conversations" },
        { value: "156", label: "Messages Sent" },
    ];
    
    return (
        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
            <div className="persona-container max-w-7xl mx-auto space-y-12">
                <header className="header-area flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    <div className="flex-1 space-y-4 text-center lg:text-left">
                        <StackedAvatars />
                        <h1 className="text-4xl font-bold tracking-tight">Your AI Persona Library</h1>
                        <p className="text-lg text-muted-foreground">Create, customize, and manage AI personas tailored to your needs.</p>
                    </div>
                    <div className="flex w-full md:w-auto items-stretch gap-4">
                        <Button variant="outline" className="add-model-button h-36 w-36 flex-col gap-2 rounded-2xl border-dashed border-2">
                            <div className="h-16 w-16 rounded-full border-2 border-dashed flex items-center justify-center mb-1">
                                <UserPlus className="h-8 w-8" />
                            </div>
                            <span className="font-semibold">+ Add Model</span>
                        </Button>
                        <Card className="summary-stats flex-1 rounded-2xl">
                            <CardContent className="flex h-full items-center justify-around p-4 gap-4">
                                {stats.map(stat => (
                                    <div key={stat.label} className="text-center px-4">
                                        <p className="text-5xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </header>

                <main className="personas-grid-section">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your Personas</h2>
                        <Select>
                            <SelectTrigger className="w-[180px] rounded-full">
                                <SelectValue placeholder="Sort by: Featured" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Sort by: Featured</SelectItem>
                                <SelectItem value="newest">Sort by: Newest</SelectItem>
                                <SelectItem value="oldest">Sort by: Oldest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {personas.map((persona, index) => (
                            <PersonaCard key={index} persona={persona} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}


export default function PersonasPage() {
    return (
        <AppLayout>
            <PersonasPageContent />
        </AppLayout>
    )
}
