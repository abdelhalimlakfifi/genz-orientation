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
        <div className="border-t border-border bg-background px-4 py-4">
            <div className="mx-auto flex max-w-3xl gap-3">
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                    className={cn(
                        'min-h-[44px] max-h-40 resize-none py-3',
                        'focus-visible:ring-brand/50 focus-visible:border-brand'
                    )}
                />
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={disabled || !value.trim()}
                    className={cn(
                        'shrink-0 self-end h-[44px] px-4',
                        'bg-brand text-brand-foreground hover:bg-brand/90'
                    )}
                >
                    <SendHorizontal className="size-4" />
                    <span className="sr-only">Envoyer</span>
                </Button>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
                Entrée pour envoyer, Maj+Entrée pour un retour à la ligne
            </p>
        </div>
    );
}
