import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Message } from '@/types/chat';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex gap-3 px-4 py-4',
                isUser && 'flex-row-reverse'
            )}
        >
            <Avatar
                className={cn(
                    'size-9 shrink-0 ring-2 ring-background shadow-md',
                    isUser
                        ? 'bg-gradient-to-br from-brand to-brand-glow text-brand-foreground'
                        : 'bg-muted/80 text-muted-foreground dark:bg-muted'
                )}
            >
                <AvatarFallback>
                    {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
                </AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    'rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed shadow-sm',
                    isUser
                        ? 'ms-auto bg-gradient-to-br from-brand to-brand-glow text-brand-foreground'
                        : 'border border-border/60 bg-chat-surface text-foreground dark:bg-card/80'
                )}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
}
