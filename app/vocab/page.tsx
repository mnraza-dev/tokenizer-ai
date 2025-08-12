"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { tokenizer } from "@/lib/tokenizer"
import Link from "next/link"
import { ArrowLeft, Search, BookOpen, Download, Trash2, TrendingUp } from "lucide-react"

export default function VocabularyPage() {
  const [vocabulary, setVocabulary] = useState<Array<{ token: string; id: number }>>([])
  const [filteredVocabulary, setFilteredVocabulary] = useState<Array<{ token: string; id: number }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [showVocab, setShowVocab] = useState(false)

  useEffect(() => {
    // Load vocabulary on component mount
    const vocab = tokenizer.getVocabulary()
    setVocabulary(vocab)
    setFilteredVocabulary(vocab)
    setIsLoaded(true)
    setTimeout(() => setShowVocab(true), 300)
  }, [])

  useEffect(() => {
    // Filter vocabulary based on search term
    if (searchTerm.trim() === "") {
      setFilteredVocabulary(vocabulary)
    } else {
      const filtered = vocabulary.filter((item) => item.token.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredVocabulary(filtered)
    }
  }, [searchTerm, vocabulary])

  const handleClearVocabulary = () => {
    setShowVocab(false)
    setTimeout(() => {
      tokenizer.clearVocabulary()
      setVocabulary([])
      setFilteredVocabulary([])
    }, 300)
  }

  const handleReloadVocabulary = async () => {
    setShowVocab(false)
    try {
      const response = await fetch("/demo_corpus.txt")
      const corpus = await response.text()
      tokenizer.learnFromCorpus(corpus)
      const vocab = tokenizer.getVocabulary()
      setVocabulary(vocab)
      setFilteredVocabulary(vocab)
      setTimeout(() => setShowVocab(true), 300)
    } catch (error) {
      console.error("Failed to reload vocabulary:", error)
    }
  }

  const handleExportVocabulary = () => {
    const vocabData = vocabulary.map((item) => `${item.id}\t${item.token}`).join("\n")
    const blob = new Blob([`ID\tToken\n${vocabData}`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tokenizer_vocabulary.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50  dark:from-black dark:via-black dark:to-black">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 dark:border-slate-900 dark:border-t-emerald-400 mx-auto mb-4"></div>
            <div className="animate-ping absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full h-12 w-12 border-4 border-emerald-400 dark:border-emerald-500 opacity-20"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 animate-pulse">Loading vocabulary...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50   dark:from-black dark:via-black dark:to-black transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-in fade-in duration-700 relative">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Link href="/">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform bg-white/50 dark:bg-slate-700/50 border-emerald-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
               
              </div>
            
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportVocabulary}
                disabled={vocabulary.length === 0}
                className="hover:scale-105 transition-transform bg-white/50 dark:bg-slate-700/50 border-emerald-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReloadVocabulary}
                className="hover:scale-105 transition-transform bg-white/50 dark:bg-slate-700/50 border-emerald-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Reload Corpus
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearVocabulary}
                disabled={vocabulary.length === 0}
                className="hover:scale-105 transition-transform bg-white/50 dark:bg-slate-700/50 border-emerald-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
          <div className="mb-6 animate-in fade-in duration-700">
               <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Vocabulary Viewer
                </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Explore all {vocabulary.length} tokens learned by the tokenizer
              </p>
          </div>

          {vocabulary.length === 0 ? (
            <Card className="animate-in fade-in slide-in-from-bottom duration-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-emerald-200 dark:border-slate-900 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No Vocabulary Found</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  The tokenizer hasn't learned any vocabulary yet. Go back to the demo and load the corpus!
                </p>
                <Link href="/">
                  <Button className="hover:scale-105 transition-transform bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                    Go to Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Statistics and Search */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="animate-in slide-in-from-left duration-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-slate-100">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Total Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-700 delay-300">
                      {vocabulary.length}
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-in slide-in-from-bottom duration-500 delay-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Filtered Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 animate-in fade-in duration-700 delay-400">
                      {filteredVocabulary.length}
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-in slide-in-from-right duration-500 delay-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Search Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                      <Input
                        placeholder="Search vocabulary..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vocabulary Grid */}
              <Card className="animate-in slide-in-from-bottom duration-500 delay-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Vocabulary Tokens</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {filteredVocabulary.length > 0
                      ? `Showing ${filteredVocabulary.length} of ${vocabulary.length} tokens`
                      : "No tokens match your search"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredVocabulary.length > 0 ? (
                    <div className="grid gap-3 max-h-[600px] overflow-y-auto">
                      {filteredVocabulary.map((item, index) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white/50 dark:bg-slate-700/50 border-emerald-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-slate-500 ${showVocab
                              ? "animate-in fade-in slide-in-from-left duration-300"
                              : "opacity-0 -translate-x-4"
                            }`}
                          style={{
                            animationDelay: showVocab ? `${index * 20}ms` : "0ms",
                            animationFillMode: "both",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="secondary"
                              className="font-mono text-xs hover:scale-110 transition-transform bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                            >
                              ID: {item.id}
                            </Badge>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{item.token}</span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">#{index + 1}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 animate-in fade-in duration-500">
                      <Search className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-2 animate-pulse" />
                      <p className="text-slate-600 dark:text-slate-300">No tokens found matching "{searchTerm}"</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-white/50 dark:bg-slate-700/50 hover:scale-105 transition-transform border-emerald-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200"
                        onClick={() => setSearchTerm("")}
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Token Distribution Info */}
              <Card className="animate-in slide-in-from-bottom duration-500 delay-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-emerald-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Token Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="animate-in fade-in duration-700 delay-700">
                      <h4 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Token Types</h4>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • Words: {vocabulary.filter((v) => /^[a-zA-Z]+$/.test(v.token)).length}
                        </li>
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • Punctuation: {vocabulary.filter((v) => /^[^\w\s]+$/.test(v.token)).length}
                        </li>
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • Numbers: {vocabulary.filter((v) => /^\d+$/.test(v.token)).length}
                        </li>
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • Mixed: {vocabulary.filter((v) => /\w/.test(v.token) && /\d/.test(v.token)).length}
                        </li>
                      </ul>
                    </div>
                    <div className="animate-in fade-in duration-700 delay-900">
                      <h4 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Token Lengths</h4>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • 1 char: {vocabulary.filter((v) => v.token.length === 1).length}
                        </li>
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • 2-4 chars: {vocabulary.filter((v) => v.token.length >= 2 && v.token.length <= 4).length}
                        </li>
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • 5-8 chars: {vocabulary.filter((v) => v.token.length >= 5 && v.token.length <= 8).length}
                        </li>
                        <li className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                          • 9+ chars: {vocabulary.filter((v) => v.token.length >= 9).length}
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
