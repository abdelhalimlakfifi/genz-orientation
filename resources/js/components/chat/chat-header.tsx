import { Link, usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { dashboard, home, login, register } from '@/routes';
import type { User } from '@/types';

interface ChatHeaderProps {
    leftSlot?: React.ReactNode;
}

export function ChatHeader({ leftSlot }: ChatHeaderProps) {
    const { auth } = usePage().props;
    const user = auth?.user as User | null | undefined;

    return (
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md dark:bg-background/60">
            <div className="flex items-center gap-3">
                {leftSlot}
                <Link
                    href={home()}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 -mx-2 font-semibold text-foreground transition-colors hover:bg-accent/50"
                    prefetch
                >
                    Orientation Pro
                </Link>
            </div>
            <nav className="flex items-center gap-3">
                {user ? (
                    <>
                        <Link
                            href={dashboard()}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                        >
                            Admin
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <UserInfo user={user} />
                                    <ChevronsUpDown className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <UserMenuContent user={user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Link
                            href={login()}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                        >
                            Connexion
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-xl bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-sm font-semibold text-brand-foreground shadow-md shadow-brand/20 transition-all hover:opacity-95 hover:shadow-lg hover:shadow-brand/25"
                        >
                            S&apos;inscrire
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
