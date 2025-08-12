"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, BookOpen, Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-emerald-200/30 dark:border-emerald-800/30 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
              TokenizerAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-slate-700 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors font-medium drop-shadow-sm"
            >
              Demo
            </Link>
            <Link
              href="/vocab"
              className="text-slate-700 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors font-medium flex items-center gap-1 drop-shadow-sm"
            >
              <BookOpen className="h-4 w-4" />
              Vocabulary
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-700 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-200/30 dark:border-emerald-800/30 animate-in slide-in-from-top duration-200 bg-emerald-50/20 dark:bg-emerald-900/10 backdrop-blur-sm rounded-b-lg">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-slate-700 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors font-medium py-2 drop-shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </Link>
              <Link
                href="/vocab"
                className="text-slate-700 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors font-medium flex items-center gap-1 py-2 drop-shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                Vocabulary
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
