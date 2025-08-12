"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, Zap } from "lucide-react"

export function HeroSection() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo-section")
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video> */}
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-emerald-100 dark:bg-black/60"></div> */}
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-100 via-teal-50 to-cyan-50 dark:from-black dark:via-black dark:to-black animate-gradient-xy"></div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-100/30 to-teal-100/40 dark:from-black dark:via-black dark:to-black"></div>

        <div className="absolute inset-0 bg-black/5 dark:bg-black/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
            Master AI
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Tokenization
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover how artificial intelligence breaks down text into tokens. Interactive learning playground with
            real-time visualization.
          </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToDemo}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Learning
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToDemo}
              className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border-emerald-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToDemo}
            className="text-slate-500 dark:text-white/70 hover:text-slate-700 dark:hover:text-white p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-200/40 dark:from-gray-600/20 to-teal-200/40 dark:to-gray-700/20 rounded-full backdrop-blur-sm"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-200/40 dark:from-gray-500/20 to-blue-200/40 dark:to-gray-600/20 rounded-full backdrop-blur-sm"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-200/40 dark:from-gray-700/20 to-emerald-200/40 dark:to-gray-800/20 rounded-full backdrop-blur-sm"></div>
      </div>
    </section>
  )
}
