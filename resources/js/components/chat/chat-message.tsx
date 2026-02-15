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
                    'size-8 shrink-0',
                    isUser
                        ? 'bg-brand text-brand-foreground'
                        : 'bg-muted text-muted-foreground'
                )}
            >
                <AvatarFallback>
                    {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
                </AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    'rounded-xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed',
                    isUser
                        ? 'bg-brand text-brand-foreground ms-auto'
                        : 'bg-muted text-foreground'
                )}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
}
