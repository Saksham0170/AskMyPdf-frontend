import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { UserButton } from '@clerk/nextjs'

export function NavBar() {
  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
          <span className="text-primary">Ask</span>MyPDF
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  )
}
