import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ChatEmptyState } from '@/components/chat/chat-empty-state';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatLayout } from '@/components/chat/chat-layout';
import { ChatMessages } from '@/components/chat/chat-messages';
import type { ChatPageProps, Message } from '@/types/chat';

export default function ChatIndex({
    conversations = [],
    activeConversationId = null,
    messages = [],
}: ChatPageProps) {
    const [localMessages, setLocalMessages] = useState<Message[]>(messages);
    const [activeId, setActiveId] = useState<string | null>(activeConversationId);
    const [localConversations, setLocalConversations] = useState(conversations);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (content: string) => {
        const userMsg: Message = {
            role: 'user',
            content,
        };
        setLocalMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        setTimeout(() => {
            const assistantMsg: Message = {
                role: 'assistant',
                content:
                    "Merci pour ta question ! L'agent d'orientation n'est pas encore connecté. Bientôt tu pourras explorer les filières et métiers au Maroc.",
            };
            setLocalMessages((prev) => [...prev, assistantMsg]);
            setIsLoading(false);
        }, 800);
    };

    const handleNewChat = () => {
        setActiveId(null);
        setLocalMessages([]);
    };

    const handleSelectConversation = (id: string) => {
        setActiveId(id);
        setLocalMessages([]);
    };

    const handleSuggestionClick = (text: string) => {
        handleSubmit(text);
    };

    return (
        <ChatLayout
            conversations={localConversations}
            activeConversationId={activeId}
            onNewChat={handleNewChat}
            onSelectConversation={handleSelectConversation}
        >
            <Head title="Orientation Pro - Chat" />
            <div className="flex flex-1 flex-col min-h-0">
                {localMessages.length === 0 ? (
                    <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
                ) : (
                    <ChatMessages messages={localMessages} isLoading={isLoading} />
                )}
                <ChatInput onSubmit={handleSubmit} disabled={isLoading} />
            </div>
        </ChatLayout>
    );
}
