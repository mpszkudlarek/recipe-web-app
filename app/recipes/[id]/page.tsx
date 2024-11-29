import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Heart, MessageSquare } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Nazwa przepisu</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Heart className="h-4 w-4" />
              </Button>
              <Link href={`/recipes/${params.id}/cook`} passHref>
                <Button className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">Gotuj przepis</Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Wegetariańskie</Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              30 min
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              4 porcje
            </Badge>
          </div>
        </div>

        <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Zdjęcie potrawy"
            width={800}
            height={400}
            className="w-full rounded-lg object-cover"
        />

        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <Card className="bg-green-50 dark:bg-green-900">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">Składniki</h2>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Składnik 1</span>
                  <span className="text-muted-foreground">200g</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Składnik 2</span>
                  <span className="text-muted-foreground">3 sztuki</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Składnik 3</span>
                  <span className="text-muted-foreground">1 łyżka</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">Przygotowanie</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="pl-2">Pierwszy krok przygotowania...</li>
                <li className="pl-2">Drugi krok przygotowania...</li>
                <li className="pl-2">Trzeci krok przygotowania...</li>
              </ol>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700 dark:text-green-300">
                Komentarze
                <MessageSquare className="h-5 w-5" />
              </h2>
              <div className="space-y-4">
                <Card className="bg-green-50 dark:bg-green-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Użytkownik</div>
                      <div className="text-sm text-muted-foreground">2 dni temu</div>
                    </div>
                    <p>Świetny przepis! Wyszło bardzo smacznie.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

