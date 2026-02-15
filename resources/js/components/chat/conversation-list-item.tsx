import { cn } from '@/lib/utils';
import type { Conversation } from '@/types/chat';

interface ConversationListItemProps {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return date.toLocaleDateString('fr-MA', { weekday: 'short' });
    return date.toLocaleDateString('fr-MA', { day: 'numeric', month: 'short' });
}

export function ConversationListItem({
    conversation,
    isActive,
    onClick,
}: ConversationListItemProps) {
    const title = conversation.title || 'Nouvelle conversation';
    const truncated = title.length > 36 ? `${title.slice(0, 36)}…` : title;

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-start text-sm transition-colors',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
            )}
        >
            <span className="truncate font-medium">{truncated}</span>
            <span className="text-xs text-muted-foreground">
                {formatDate(conversation.updated_at)}
            </span>
        </button>
    );
}
