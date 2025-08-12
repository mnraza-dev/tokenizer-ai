"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg bg-emerald-50/90 dark:bg-emerald-900/20 backdrop-blur-sm border-emerald-300/50 dark:border-emerald-700/50 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-100/90 dark:hover:bg-emerald-800/30"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 text-emerald-600 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 text-emerald-400 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
