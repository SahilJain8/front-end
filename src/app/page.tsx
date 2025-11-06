
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayoutContext } from '@/components/layout/app-layout';

// A mock auth check function
// In a real app, you'd use a library like NextAuth.js, Clerk, or your own auth context
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking an async check for authentication status
        const checkAuth = async () => {
            // In a real app, this would be an API call or a check for a token in localStorage/cookies
            const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsAuthenticated(userIsLoggedIn);
            setLoading(false);
        };
        checkAuth();
    }, []);
    
    // This is a mock login function for demonstration purposes
    // It would be replaced by your actual login logic (e.g., in the login page)
    const login = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsAuthenticated(true);
    };

    return { isAuthenticated, loading, login };
};


export default function Home() {
    const router = useRouter();
    // For now, we'll assume the user is not authenticated and redirect.
    // We will build the full auth flow in the next steps.
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            router.replace('/auth/login');
        }
    }, [isClient, router]);

    // Render a loading state or null while redirecting
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}

// Keep the original AppLayout structure for when we integrate authentication
// The main app content will be moved to a protected route like `/chat` later.
/*
import { ChatInterface } from "@/components/chat/chat-interface";
import { Button } from '@/components/ui/button';
import { Pin } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { ModelSelector } from "@/components/chat/model-selector";
import { TokenTracker } from "@/components/chat/token-tracker";
import type { Pin as PinType } from "@/components/layout/right-sidebar";
import type { Message } from "@/components/chat/chat-message";

interface HomeProps {
    isRightSidebarVisible?: boolean;
    setIsRightSidebarVisible?: Dispatch<SetStateAction<boolean>>;
    onPinMessage?: (pin: PinType) => void;
    onUnpinMessage?: (pinId: string) => void;
    messages?: Message[];
    setMessages?: (messages: Message[]) => void;
}

function HomePageContent({ isRightSidebarVisible, setIsRightSidebarVisible, onPinMessage, onUnpinMessage, messages, setMessages }: HomeProps) {

  return (
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="flex items-center justify-between p-2 border-b h-[69px] bg-card shrink-0">
            <div className="flex items-center gap-4">
                <ModelSelector />
                <div className="w-full max-w-sm hidden md:block">
                    <TokenTracker />
                </div>
            </div>
            <div className="flex items-center gap-4">
                {setIsRightSidebarVisible && isRightSidebarVisible === false && (
                    <Button variant="outline" onClick={() => setIsRightSidebarVisible(true)}>
                        <Pin className="mr-2 h-4 w-4" />
                        Show Pinboard
                    </Button>
                )}
            </div>
        </header>
        <ChatInterface onPinMessage={onPinMessage} onUnpinMessage={onUnpinMessage} messages={messages} setMessages={setMessages} />
      </div>
  );
}

export default function Home() {
    return (
        <AppLayout>
            <HomePageContent />
        </AppLayout>
    )
}
*/
