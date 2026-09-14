// /pages/_app.tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { spaceGrotesk } from "@/lib/fonts"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={spaceGrotesk.variable}>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </ThemeProvider>
  )
}