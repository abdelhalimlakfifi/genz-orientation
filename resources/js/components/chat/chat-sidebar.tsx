import { MessageSquarePlus, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Conversation } from '@/types/chat';
import { ConversationListItem } from './conversation-list-item';

interface ChatSidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    mode?: 'header' | 'main';
}

export function ChatSidebar({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    isOpen = false,
    onOpenChange,
    mode = 'main',
}: ChatSidebarProps) {
    const isMobile = useIsMobile();
    const closeSheet = () => onOpenChange?.(false);

    const sidebarContent = (
        <>
            <Button
                variant="outline"
                className="w-full justify-start gap-2 border-sidebar-border"
                onClick={() => {
                    onNewChat();
                    closeSheet();
                }}
            >
                <MessageSquarePlus className="size-4" />
                Nouvelle conversation
            </Button>
            <ScrollArea className="-mx-2 mt-4 flex-1">
                <div className="flex flex-col gap-0.5 px-2">
                    {conversations.map((conv) => (
                        <ConversationListItem
                            key={conv.id}
                            conversation={conv}
                            isActive={conv.id === activeConversationId}
                            onClick={() => {
                                onSelectConversation(conv.id);
                                closeSheet();
                            }}
                        />
                    ))}
                </div>
            </ScrollArea>
        </>
    );

    if (mode === 'header') {
        if (!isMobile) return null;
        return (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange?.(true)}
                className="md:hidden"
            >
                <PanelLeft className="size-5" />
                <span className="sr-only">Ouvrir les conversations</span>
            </Button>
        );
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent
                    side="left"
                    className="flex w-72 flex-col p-4"
                >
                    <SheetHeader className="pb-4">
                        <SheetTitle>Conversations</SheetTitle>
                    </SheetHeader>
                    <div className="flex min-h-0 flex-1 flex-col">
                        {sidebarContent}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <aside className="flex w-64 shrink-0 flex-col border-e border-sidebar-border bg-sidebar p-4">
            {sidebarContent}
        </aside>
    );
}
