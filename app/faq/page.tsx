import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "Jak dodać nowy przepis?",
    answer: "Aby dodać nowy przepis, kliknij na 'Dodaj przepis' w górnym menu. Wypełnij wszystkie wymagane pola, dodaj zdjęcie (jeśli masz) i kliknij 'Opublikuj przepis'."
  },
  {
    question: "Jak zapisać przepis do ulubionych?",
    answer: "Na stronie przepisu znajdziesz ikonę serca. Kliknij ją, aby dodać przepis do ulubionych. Możesz później znaleźć wszystkie ulubione przepisy w zakładce 'Ulubione'."
  },
  {
    question: "Jak filtrować przepisy?",
    answer: "Na stronie 'Wszystkie przepisy' znajdziesz opcje filtrowania po typie dania, czasie przygotowania, diecie i innych kryteriach. Użyj tych filtrów, aby znaleźć przepisy odpowiadające Twoim preferencjom."
  },
  {
    question: "Jak zmienić ustawienia konta?",
    answer: "Kliknij ikonę koła zębatego w prawym górnym rogu, aby przejść do ustawień. Tam możesz zmienić swoje dane osobowe, preferencje językowe i jednostki miary."
  },
  {
    question: "Jak korzystać z trybu gotowania?",
    answer: "Po otwarciu przepisu, kliknij przycisk 'Gotuj przepis'. Tryb gotowania prowadzi Cię krok po kroku przez przygotowanie dania, pozwalając oznaczać ukończone etapy."
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">Często zadawane pytania (FAQ)</h1>
        <div className="relative ml-2 group transition-transform duration-300 ease-in-out hover:scale-110">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-green-600 dark:text-green-400 cursor-help transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-300"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <path d="M12 17h.01"/>
          </svg>
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-white dark:bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tutaj znajdziesz odpowiedzi na najczęściej zadawane pytania dotyczące korzystania z naszej aplikacji.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white dark:bg-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-black dark:text-gray-900 flex items-center gap-2">
            <Youtube className="h-6 w-6 text-black dark:text-gray-900" />
            Poradnik wideo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-black dark:text-gray-900 mb-4">
            Obejrzyj nasz poradnik wideo, aby dowiedzieć się więcej o korzystaniu z naszej strony z przepisami:
          </p>
          <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
            <Button className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-300">
              Obejrzyj na YouTube
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

