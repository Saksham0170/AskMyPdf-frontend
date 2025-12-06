"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HomeHeaderProps {
    showSidebarTrigger?: boolean;
}

export function Navbar({ showSidebarTrigger = false }: HomeHeaderProps) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
            <div className={`${isDashboard ? 'px-4' : 'mx-auto max-w-7xl px-6'} h-16 flex items-center justify-between`}>

                {/* Left Side: Logo */}
                <div className="flex items-center gap-3">
                    {showSidebarTrigger && <SidebarTrigger />}

                    <Link href={isDashboard ? "/dashboard" : "/"} className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                        <span className="text-lg font-semibold">AskMyPDF</span>
                    </Link>
                </div>

                {/* Right Side: Auth + Theme Toggle */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <button className="bg-purple-500 text-white rounded-full font-medium text-sm h-9 px-5 hover:bg-purple-600 transition-all active:scale-95">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
