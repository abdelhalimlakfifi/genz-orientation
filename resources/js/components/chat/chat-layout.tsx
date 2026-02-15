import { useState } from 'react';
import { ChatHeader } from './chat-header';
import { ChatSidebar } from './chat-sidebar';
import type { Conversation } from '@/types/chat';

interface ChatLayoutProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    children: React.ReactNode;
}

export function ChatLayout({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    children,
}: ChatLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen flex-col bg-chat-bg">
            <ChatHeader
                leftSlot={
                    <ChatSidebar
                        mode="header"
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onNewChat={onNewChat}
                        onSelectConversation={onSelectConversation}
                        isOpen={sidebarOpen}
                        onOpenChange={setSidebarOpen}
                    />
                }
            />
            <div className="flex min-h-0 flex-1">
                <div className="hidden md:block">
                    <ChatSidebar
                        mode="main"
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onNewChat={onNewChat}
                        onSelectConversation={onSelectConversation}
                    />
                </div>
                <main className="flex min-w-0 flex-1 flex-col">
                    {children}
                </main>
                <div className="md:hidden">
                    <ChatSidebar
                        mode="main"
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onNewChat={onNewChat}
                        onSelectConversation={onSelectConversation}
                        isOpen={sidebarOpen}
                        onOpenChange={setSidebarOpen}
                    />
                </div>
            </div>
        </div>
    );
}
