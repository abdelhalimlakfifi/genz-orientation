export interface Conversation {
    id: string;
    title?: string;
    updated_at: string;
}

export interface Message {
    id?: string;
    role: 'user' | 'assistant';
    content: string;
    created_at?: string;
}

export interface ChatPageProps {
    conversations: Conversation[];
    activeConversationId?: string | null;
    messages?: Message[];
}
