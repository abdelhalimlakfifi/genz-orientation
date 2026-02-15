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
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4">
            <div className="flex items-center gap-2">
                {leftSlot}
                <Link href={home()} className="flex items-center gap-2" prefetch>
                    <span className="font-semibold text-foreground">
                        Orientation Pro
                    </span>
                </Link>
            </div>
            <nav className="flex items-center gap-2">
                {user ? (
                    <>
                        <Link
                            href={dashboard()}
                            className="text-sm text-muted-foreground hover:text-foreground"
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
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            Connexion
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
                        >
                            S&apos;inscrire
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
