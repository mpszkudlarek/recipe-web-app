import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, HelpCircle } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  return (
    <nav className="border-b bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300">
              CookBook
            </Link>
            <Link href="/results">
              <Button variant="ghost" className="nav-link">Wszystkie przepisy</Button>
            </Link>
            <Link href="/favorites">
              <Button variant="ghost" className="nav-link">Ulubione</Button>
            </Link>
            <Link href="/recipes/add">
              <Button variant="ghost" className="nav-link">Dodaj przepis</Button>
            </Link>
            <Link href="/random-recipe">
              <Button variant="ghost" className="nav-link">
                Przepis dnia
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/faq" className="nav-link">
              <HelpCircle className="h-6 w-6" />
            </Link>
            <Link href="/settings" className="nav-link">
              <Settings className="h-6 w-6" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

