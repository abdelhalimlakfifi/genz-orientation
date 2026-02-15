import { MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUGGESTIONS = [
    'Quelles filières après le bac ?',
    'Métiers du numérique au Maroc',
    'Écoles d\'ingénieurs : CPGE ou concours ?',
    'Secteur de la santé : médecin ou pharmacien ?',
];

interface ChatEmptyStateProps {
    onSuggestionClick?: (text: string) => void;
}

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-gradient-to-br from-chat-bg to-brand-soft px-4 py-16 dark:from-chat-bg dark:via-brand-soft dark:to-chat-bg dark:bg-gradient-to-b">
            <div className="flex flex-col items-center gap-5">
                <div className="relative">
                    <div className="absolute -inset-2 rounded-2xl bg-brand/20 blur-xl" />
                    <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-glow shadow-lg shadow-brand/25">
                        <MessageCircle className="size-10 text-brand-foreground" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-background/90 p-1 shadow-md dark:bg-card">
                        <Sparkles className="size-4 text-brand" />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        Comment puis-je t&apos;aider avec ton orientation ?
                    </h2>
                    <p className="max-w-lg text-base text-muted-foreground">
                        Pose une question sur les filières, les métiers ou les formations au Maroc.
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {SUGGESTIONS.map((text) => (
                    <button
                        key={text}
                        type="button"
                        onClick={() => onSuggestionClick?.(text)}
                        className={cn(
                            'rounded-xl border border-border/80 bg-chat-surface px-5 py-3 text-sm font-medium text-foreground shadow-sm',
                            'hover:border-brand/50 hover:bg-brand-soft hover:shadow-md hover:shadow-brand/10 hover:text-foreground',
                            'transition-all duration-200',
                            'focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2'
                        )}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
}
