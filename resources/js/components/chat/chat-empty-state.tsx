import { MessageCircle } from 'lucide-react';
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
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
            <div className="flex flex-col items-center gap-3">
                <div className="flex size-16 items-center justify-center rounded-full bg-brand/10">
                    <MessageCircle className="size-8 text-brand" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    Comment puis-je t&apos;aider avec ton orientation ?
                </h2>
                <p className="max-w-md text-center text-sm text-muted-foreground">
                    Pose une question sur les filières, les métiers ou les formations au Maroc.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((text) => (
                    <button
                        key={text}
                        type="button"
                        onClick={() => onSuggestionClick?.(text)}
                        className={cn(
                            'rounded-lg border border-border bg-card px-4 py-2.5 text-sm',
                            'hover:bg-accent hover:text-accent-foreground transition-colors',
                            'focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring'
                        )}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
}
