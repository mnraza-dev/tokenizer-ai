export interface TokenizerVocabulary {
  [token: string]: number
}

export interface TokenizerState {
  vocabulary: TokenizerVocabulary
  reverseVocabulary: { [id: number]: string }
  nextId: number
}

export class SimpleTokenizer {
  private vocabulary: TokenizerVocabulary = {}
  private reverseVocabulary: { [id: number]: string } = {}
  private nextId = 0
  private readonly STORAGE_KEY = "tokenizer_vocabulary"

  constructor() {
    this.loadFromStorage()
  }

  /**
   * Learn vocabulary from a text corpus
   */
  learnFromCorpus(text: string): void {
    // Simple word-level tokenization
    const words = this.preprocessText(text)

    for (const word of words) {
      if (!(word in this.vocabulary)) {
        this.vocabulary[word] = this.nextId
        this.reverseVocabulary[this.nextId] = word
        this.nextId++
      }
    }

    this.saveToStorage()
  }

  /**
   * Preprocess text into tokens (words and punctuation)
   */
  private preprocessText(text: string): string[] {
    // Split on whitespace and punctuation, keeping punctuation as separate tokens
    return text
      .toLowerCase()
      .replace(/([.!?;,:])/g, " $1 ") // Add spaces around punctuation
      .split(/\s+/)
      .filter((token) => token.length > 0)
  }

  /**
   * Encode text to token IDs
   */
  encode(text: string): { tokens: string[]; tokenIds: number[]; unknownTokens: string[] } {
    const tokens = this.preprocessText(text)
    const tokenIds: number[] = []
    const unknownTokens: string[] = []

    for (const token of tokens) {
      if (token in this.vocabulary) {
        tokenIds.push(this.vocabulary[token])
      } else {
        // Use a special unknown token ID (-1)
        tokenIds.push(-1)
        if (!unknownTokens.includes(token)) {
          unknownTokens.push(token)
        }
      }
    }

    return { tokens, tokenIds, unknownTokens }
  }

  /**
   * Decode token IDs back to text
   */
  decode(tokenIds: number[]): string {
    const tokens = tokenIds.map((id) => {
      if (id === -1) return "[UNK]"
      return this.reverseVocabulary[id] || "[UNK]"
    })

    return tokens.join(" ").replace(/\s+([.!?;,:])/g, "$1")
  }

  /**
   * Get all vocabulary tokens sorted alphabetically
   */
  getVocabulary(): Array<{ token: string; id: number }> {
    return Object.entries(this.vocabulary)
      .map(([token, id]) => ({ token, id }))
      .sort((a, b) => a.token.localeCompare(b.token))
  }

  /**
   * Get vocabulary size
   */
  getVocabularySize(): number {
    return Object.keys(this.vocabulary).length
  }

  /**
   * Clear vocabulary
   */
  clearVocabulary(): void {
    this.vocabulary = {}
    this.reverseVocabulary = {}
    this.nextId = 0
    this.saveToStorage()
  }

  /**
   * Save vocabulary to localStorage
   */
  private saveToStorage(): void {
    if (typeof window !== "undefined") {
      const state: TokenizerState = {
        vocabulary: this.vocabulary,
        reverseVocabulary: this.reverseVocabulary,
        nextId: this.nextId,
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state))
    }
  }

  /**
   * Load vocabulary from localStorage
   */
  private loadFromStorage(): void {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        try {
          const state: TokenizerState = JSON.parse(stored)
          this.vocabulary = state.vocabulary || {}
          this.reverseVocabulary = state.reverseVocabulary || {}
          this.nextId = state.nextId || 0
        } catch (error) {
          console.warn("Failed to load tokenizer vocabulary from storage:", error)
        }
      }
    }
  }

  /**
   * Get a color for a token based on its ID (for visualization)
   */
  getTokenColor(tokenId: number): string {
    if (tokenId === -1) return "bg-red-100 text-red-800 border-red-200"

    const colors = [
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-green-100 text-green-800 border-green-200",
      "bg-purple-100 text-purple-800 border-purple-200",
      "bg-yellow-100 text-yellow-800 border-yellow-200",
      "bg-pink-100 text-pink-800 border-pink-200",
      "bg-indigo-100 text-indigo-800 border-indigo-200",
      "bg-orange-100 text-orange-800 border-orange-200",
      "bg-teal-100 text-teal-800 border-teal-200",
    ]

    return colors[tokenId % colors.length]
  }
}

// Export a singleton instance
export const tokenizer = new SimpleTokenizer()
