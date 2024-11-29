import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, Shuffle } from 'lucide-react'

export function MainNav() {
  return (
    <nav className="border-b bg-green-50 dark:bg-green-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-green-700 dark:text-green-300">
              Logo
            </Link>
            <Link href="/results" passHref>
              <Button variant="ghost" className="text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-400">Wszystkie przepisy</Button>
            </Link>
            <Link href="/favorites" passHref>
              <Button variant="ghost" className="text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-400">Ulubione</Button>
            </Link>
            <Link href="/recipes/add" passHref>
              <Button variant="ghost" className="text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-400">Dodaj przepis</Button>
            </Link>
            <Link href="/random-recipe" passHref>
              <Button variant="ghost" className="text-sm font-medium text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-400">
                <Shuffle className="mr-2 h-4 w-4" />
                Losowy przepis
              </Button>
            </Link>
          </div>
          <Link href="/settings" className="text-sm font-medium">
            <Settings className="h-5 w-5 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

