import { Inter } from 'next/font/google'
import "./globals.css"
import { MainNav } from "@/components/main-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { FavoritesProvider } from "@/contexts/FavoritesContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <header>
                <MainNav />
              </header>
              <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
              <footer className="bg-secondary">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                  © 2024 CookBook. Wszystkie prawa zastrzeżone.
                </div>
              </footer>
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

