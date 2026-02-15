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
        <ScrollArea className="flex-1 px-4">
            <div className="mx-auto max-w-3xl py-6">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id ?? `${msg.role}-${msg.content.slice(0, 20)}`} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex gap-3 px-4 py-4">
                        <Spinner className="size-5 shrink-0" />
                        <span className="text-sm text-muted-foreground">
                            L&apos;agent réfléchit…
                        </span>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}
