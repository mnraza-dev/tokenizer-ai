"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { tokenizer } from "@/lib/tokenizer"
import Link from "next/link"
import { BookOpen, Zap, Brain, Sparkles } from "lucide-react"

export default function Home() {
  const [inputText, setInputText] = useState("The quick brown fox jumps over the lazy dog!")
  const [encodedResult, setEncodedResult] = useState<{
    tokens: string[]
    tokenIds: number[]
    unknownTokens: string[]
  }>({ tokens: [], tokenIds: [], unknownTokens: [] })
  const [decodeInput, setDecodeInput] = useState("0 1 2 3 4 5 0 6 7")
  const [decodedText, setDecodedText] = useState("")
  const [vocabularySize, setVocabularySize] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTokenizing, setIsTokenizing] = useState(false)
  const [isDecoding, setIsDecoding] = useState(false)
  const [showTokens, setShowTokens] = useState(false)

  useEffect(() => {
    // Load demo corpus on first visit
    const loadCorpus = async () => {
      try {
        const response = await fetch("/demo_corpus.txt")
        const corpus = await response.text()
        tokenizer.learnFromCorpus(corpus)
        setVocabularySize(tokenizer.getVocabularySize())

        // Encode initial text
        const result = tokenizer.encode(inputText)
        setEncodedResult(result)
        setIsLoaded(true)
        setTimeout(() => setShowTokens(true), 500)
      } catch (error) {
        console.error("Failed to load demo corpus:", error)
        setIsLoaded(true)
      }
    }

    loadCorpus()
  }, [])

  const handleEncode = async () => {
    setIsTokenizing(true)
    setShowTokens(false)

    await new Promise((resolve) => setTimeout(resolve, 300))

    const result = tokenizer.encode(inputText)
    setEncodedResult(result)
    setIsTokenizing(false)

    setTimeout(() => setShowTokens(true), 100)
  }

  const handleDecode = async () => {
    setIsDecoding(true)

    await new Promise((resolve) => setTimeout(resolve, 300))

    const tokenIds = decodeInput
      .split(/\s+/)
      .map((id) => Number.parseInt(id.trim()))
      .filter((id) => !isNaN(id))

    const decoded = tokenizer.decode(tokenIds)
    setDecodedText(decoded)
    setIsDecoding(false)
  }

  const handleClearVocabulary = () => {
    tokenizer.clearVocabulary()
    setVocabularySize(0)
    setEncodedResult({ tokens: [], tokenIds: [], unknownTokens: [] })
    setDecodedText("")
    setShowTokens(false)
  }

  const handleReloadCorpus = async () => {
    try {
      const response = await fetch("/demo_corpus.txt")
      const corpus = await response.text()
      tokenizer.learnFromCorpus(corpus)
      setVocabularySize(tokenizer.getVocabularySize())
      handleEncode()
    } catch (error) {
      console.error("Failed to reload corpus:", error)
    }
  }

  if (!isLoaded) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary mx-auto mb-4"></div>
              <div className="animate-ping absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full h-12 w-12 border-4 border-primary opacity-20"></div>
            </div>
            <p className="text-muted-foreground animate-pulse">Loading tokenizer...</p>
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <HeroSection />

      <div id="demo-section" className="min-h-screen  bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50   dark:from-black dark:via-black dark:to-black transition-colors duration-500">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Interactive Tokenization Demo</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience real-time tokenization with visual feedback and learn how AI processes text
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Demo Area */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="animate-in slide-in-from-left duration-500 bg-card/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <Zap className="h-5 w-5 text-primary" />
                          Live Tokenization Demo
                          <div className="flex items-center gap-1 ml-2">
                            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                            <span className="text-sm text-muted-foreground">({vocabularySize} tokens)</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Real-time text tokenization with visual feedback
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReloadCorpus}
                          className="hover:scale-105 transition-transform bg-transparent"
                        >
                          Reload Corpus
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearVocabulary}
                          className="hover:scale-105 transition-transform bg-transparent"
                        >
                          Clear Vocab
                        </Button>
                        <Link href="/vocab">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 transition-transform bg-transparent"
                          >
                            View Vocabulary
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="animate-in slide-in-from-left duration-500 delay-150 bg-card/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Tabs defaultValue="encode" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-muted">
                        <TabsTrigger value="encode" className="transition-all duration-200">
                          Encode (Text → Tokens)
                        </TabsTrigger>
                        <TabsTrigger value="decode" className="transition-all duration-200">
                          Decode (Tokens → Text)
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="encode" className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">Input Text:</label>
                          <Textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your text here..."
                            className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary"
                          />
                          <Button
                            onClick={handleEncode}
                            className="mt-2 hover:scale-105 transition-all duration-200"
                            disabled={isTokenizing}
                          >
                            {isTokenizing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                Tokenizing...
                              </>
                            ) : (
                              "Tokenize"
                            )}
                          </Button>
                        </div>

                        {encodedResult.tokens.length > 0 && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2 text-foreground">Tokens:</h3>
                              <div className="flex flex-wrap gap-2">
                                {encodedResult.tokens.map((token, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className={`${tokenizer.getTokenColor(encodedResult.tokenIds[index])} transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                                      showTokens
                                        ? "animate-in fade-in slide-in-from-bottom duration-300"
                                        : "opacity-0 translate-y-2"
                                    }`}
                                    style={{
                                      animationDelay: showTokens ? `${index * 50}ms` : "0ms",
                                      animationFillMode: "both",
                                    }}
                                  >
                                    {token}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div
                              className={`transition-all duration-500 ${showTokens ? "animate-in fade-in slide-in-from-bottom delay-300" : "opacity-0"}`}
                            >
                              <h3 className="font-medium mb-2 text-foreground">Token IDs:</h3>
                              <div className="bg-muted p-3 rounded-lg font-mono text-sm hover:bg-muted/80 transition-colors duration-200 text-foreground">
                                [{encodedResult.tokenIds.join(", ")}]
                              </div>
                            </div>

                            {encodedResult.unknownTokens.length > 0 && (
                              <div
                                className={`transition-all duration-500 ${showTokens ? "animate-in fade-in slide-in-from-bottom delay-500" : "opacity-0"}`}
                              >
                                <h3 className="font-medium mb-2 text-destructive">Unknown Tokens:</h3>
                                <div className="flex flex-wrap gap-2">
                                  {encodedResult.unknownTokens.map((token, index) => (
                                    <Badge
                                      key={index}
                                      variant="destructive"
                                      className="animate-in fade-in slide-in-from-bottom duration-300 hover:scale-110 transition-transform"
                                      style={{ animationDelay: `${(encodedResult.tokens.length + index) * 50}ms` }}
                                    >
                                      {token}
                                    </Badge>
                                  ))}
                                </div>
                                <p className="text-sm text-destructive mt-2 animate-in fade-in duration-500 delay-700">
                                  These tokens are not in the vocabulary. Try adding more text to the corpus!
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="decode" className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground">
                            Token IDs (space-separated):
                          </label>
                          <Textarea
                            value={decodeInput}
                            onChange={(e) => setDecodeInput(e.target.value)}
                            placeholder="0 1 2 3 4..."
                            className="min-h-[100px] font-mono transition-all duration-200 focus:ring-2 focus:ring-primary"
                          />
                          <Button
                            onClick={handleDecode}
                            className="mt-2 hover:scale-105 transition-all duration-200"
                            disabled={isDecoding}
                          >
                            {isDecoding ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                Decoding...
                              </>
                            ) : (
                              "Decode"
                            )}
                          </Button>
                        </div>

                        {decodedText && (
                          <div className="animate-in fade-in slide-in-from-bottom duration-500">
                            <h3 className="font-medium mb-2 text-foreground">Decoded Text:</h3>
                            <div className="bg-muted p-3 rounded-lg hover:bg-muted/80 transition-colors duration-200 text-foreground">
                              {decodedText}
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="animate-in slide-in-from-right duration-500 bg-card/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Brain className="h-5 w-5 text-primary" />
                      What is Tokenization?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <p className="animate-in fade-in duration-700 delay-300 text-muted-foreground">
                      <strong>Tokenization</strong> is the process of breaking down text into smaller, manageable pieces
                      called <em>tokens</em>. Think of it as teaching a computer to read by splitting sentences into
                      words!
                    </p>

                    <div className="bg-primary/10 p-3 rounded-lg animate-in fade-in duration-700 delay-500 hover:bg-primary/20 transition-colors border border-primary/20">
                      <p className="font-medium text-primary mb-2">Example:</p>
                      <p className="text-primary/80">"Hello world!" → ["hello", "world", "!"]</p>
                    </div>

                    <div className="animate-in fade-in duration-700 delay-700">
                      <h4 className="font-medium mb-2 text-foreground">Why Tokenize?</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Computers work with numbers, not words</li>
                        <li>Each token gets a unique ID number</li>
                        <li>AI models process these numbers</li>
                        <li>Enables text understanding and generation</li>
                      </ul>
                    </div>

                    <div className="animate-in fade-in duration-700 delay-1000">
                      <h4 className="font-medium mb-2 text-foreground">How This Demo Works:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Learn vocabulary from demo text</li>
                        <li>Assign unique IDs to each word</li>
                        <li>Convert your text to token IDs</li>
                        <li>Color-code for easy visualization</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-in slide-in-from-right duration-500 delay-200 bg-card/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <BookOpen className="h-5 w-5 text-amber-600" />
                      Try These Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Machine learning is amazing!",
                      "The cat sat on the mat.",
                      "Artificial intelligence rocks!",
                      "Hello, how are you today?",
                    ].map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-3 hover:scale-105 hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-right bg-transparent"
                        style={{ animationDelay: `${800 + index * 100}ms` }}
                        onClick={() => {
                          setInputText(example)
                          setShowTokens(false)
                          setTimeout(() => {
                            const result = tokenizer.encode(example)
                            setEncodedResult(result)
                            setTimeout(() => setShowTokens(true), 100)
                          }, 100)
                        }}
                      >
                        "{example}"
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
