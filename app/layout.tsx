import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Custom Tokenizer',
  description: 'An interactive tokenizer playground built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="tokenizer-theme">
         <main>
           {children}
         </main>
        </ThemeProvider>
      </body>

    </html>
  )
}
