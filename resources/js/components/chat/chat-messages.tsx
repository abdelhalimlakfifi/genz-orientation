import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import type { Message } from '@/types/chat';
import { ChatMessage } from './chat-message';

interface ChatMessagesProps {
    messages: Message[];
    isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    return (
        <ScrollArea className="flex-1 bg-gradient-to-br from-chat-bg to-brand-soft px-4 dark:from-chat-bg dark:via-brand-soft dark:to-chat-bg dark:bg-gradient-to-b">
            <div className="mx-auto max-w-3xl py-6">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id ?? `${msg.role}-${msg.content.slice(0, 20)}`} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex gap-3 px-4 py-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/80 dark:bg-muted">
                            <Spinner className="size-4 text-brand" />
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-chat-surface px-4 py-3 shadow-sm dark:bg-card/80">
                            <span className="text-sm text-muted-foreground">
                                L&apos;agent réfléchit…
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}
