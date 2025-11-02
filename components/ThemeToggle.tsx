"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  // Avoid hydration mismatch by rendering after mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return <div className="h-6 w-[52px] rounded-full bg-muted animate-in fade-in-50" aria-hidden />
  }

  const isDark = (theme ?? resolvedTheme) === "dark"

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle dark mode
      </Label>
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="data-[state=checked]:bg-primary transition-colors"
        aria-label="Toggle dark mode"
      />
    </div>
  )
}
