import { useCallback, useState, type KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSubmit: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({
    onSubmit,
    disabled = false,
    placeholder = "Pose ta question sur ton orientation…",
}: ChatInputProps) {
    const [value, setValue] = useState('');

    const handleSubmit = useCallback(() => {
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSubmit(trimmed);
        setValue('');
    }, [value, disabled, onSubmit]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    return (
        <div className="border-t border-border/60 bg-chat-surface/50 px-4 py-5 backdrop-blur-sm dark:bg-chat-surface/30">
            <div className="mx-auto flex max-w-3xl gap-3">
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                    className={cn(
                        'min-h-[48px] max-h-40 resize-none rounded-2xl border-2 py-3 shadow-sm',
                        'focus-visible:ring-brand/40 focus-visible:border-brand focus-visible:ring-2',
                        'bg-background/80 dark:bg-background/50'
                    )}
                />
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={disabled || !value.trim()}
                    className={cn(
                        'shrink-0 self-end h-[48px] w-12 rounded-2xl px-0',
                        'bg-gradient-to-br from-brand to-brand-glow text-brand-foreground',
                        'hover:opacity-95 hover:shadow-lg hover:shadow-brand/25 active:scale-95',
                        'transition-all duration-200'
                    )}
                >
                    <SendHorizontal className="size-5" />
                    <span className="sr-only">Envoyer</span>
                </Button>
            </div>
            <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-muted-foreground">
                Entrée pour envoyer, Maj+Entrée pour un retour à la ligne
            </p>
        </div>
    );
}
