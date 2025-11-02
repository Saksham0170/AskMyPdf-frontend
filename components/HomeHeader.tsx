import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './ThemeToggle'

export function HomeHeader() {
    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <ThemeToggle />
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="text-foreground hover:text-primary transition-colors">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5a3ddc] transition-colors">
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}