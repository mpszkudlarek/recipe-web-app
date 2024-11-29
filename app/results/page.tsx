"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Clock, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getAllRecipes } from '@/lib/recipes'

type SortOption = 'newest' | 'likes' | 'time'
type MeatFilter = 'all' | 'drob' | 'wolowina' | 'wieprzowina' | 'owoce-morza'
type DietFilter = 'all' | 'wege' | 'wegetarianskie' | 'keto'
type TypeFilter = 'all' | 'zupa' | 'danie-glowne' | 'deser' | 'napoj'
type TimeFilter = 'all' | '15' | '30' | '60' | '60+'

export default function ResultsPage() {
  const [recipes, setRecipes] = useState(getAllRecipes())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [meatFilter, setMeatFilter] = useState<MeatFilter>('all')
  const [dietFilter, setDietFilter] = useState<DietFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')

  const filteredAndSortedRecipes = recipes
    .filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (meatFilter === 'all' || recipe.meat === meatFilter) &&
      (dietFilter === 'all' || recipe.diet === dietFilter) &&
      (typeFilter === 'all' || recipe.type === typeFilter) &&
      (timeFilter === 'all' || 
        (timeFilter === '15' && recipe.cookingTime <= 15) ||
        (timeFilter === '30' && recipe.cookingTime <= 30) ||
        (timeFilter === '60' && recipe.cookingTime <= 60) ||
        (timeFilter === '60+' && recipe.cookingTime > 60)
      )
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      if (sortBy === 'likes') return b.likes - a.likes
      if (sortBy === 'time') return a.cookingTime - b.cookingTime
      return 0
    })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-300">Wszystkie przepisy</h1>
      
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <Label htmlFor="sort">Sortuj według</Label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger id="sort" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Najnowsze</SelectItem>
                <SelectItem value="likes">Liczba polubień</SelectItem>
                <SelectItem value="time">Czas przygotowania</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Label htmlFor="meat">Mięso</Label>
            <Select value={meatFilter} onValueChange={(value) => setMeatFilter(value as MeatFilter)}>
              <SelectTrigger id="meat" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="drob">Drób</SelectItem>
                <SelectItem value="wolowina">Wołowina</SelectItem>
                <SelectItem value="wieprzowina">Wieprzowina</SelectItem>
                <SelectItem value="owoce-morza">Owoce morza</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Label htmlFor="diet">Dieta</Label>
            <Select value={dietFilter} onValueChange={(value) => setDietFilter(value as DietFilter)}>
              <SelectTrigger id="diet" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="wege">Wege</SelectItem>
                <SelectItem value="wegetarianskie">Wegetariańskie</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Label htmlFor="type">Typ dania</Label>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
              <SelectTrigger id="type" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="zupa">Zupa</SelectItem>
                <SelectItem value="danie-glowne">Danie główne</SelectItem>
                <SelectItem value="deser">Deser</SelectItem>
                <SelectItem value="napoj">Napój</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Label htmlFor="time">Czas przygotowania</Label>
            <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as TimeFilter)}>
              <SelectTrigger id="time" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="15">Do 15 min</SelectItem>
                <SelectItem value="30">Do 30 min</SelectItem>
                <SelectItem value="60">Do 1h</SelectItem>
                <SelectItem value="60+">Ponad 1h</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Label htmlFor="search">Szukaj przepisu</Label>
          <Input
            id="search"
            type="search"
            placeholder="Wpisz nazwę przepisu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-green-50 dark:bg-green-800"
          />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedRecipes.map((recipe) => (
          <Card key={recipe.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <Image
                src={recipe.image}
                alt={recipe.name}
                width={400}
                height={200}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">{recipe.name}</h2>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">{recipe.type}</Badge>
                <div className="flex items-center gap-4 mt-4 text-sm text-green-600 dark:text-green-400">
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Clock className="h-4 w-4" />
                    {recipe.cookingTime} min
                  </span>
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Users className="h-4 w-4" />
                    {recipe.servings} porcji
                  </span>
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Heart className="h-4 w-4 text-red-500" />
                    {recipe.likes}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Link href={`/recipes/${recipe.id}`} passHref>
                <Button variant="outline" size="sm" className="text-green-700 hover:bg-green-100 hover:text-green-800 dark:text-green-300 dark:hover:bg-green-800 dark:hover:text-green-100">
                  Zobacz przepis
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                <Heart className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedRecipes.length === 0 && (
        <p className="text-center text-green-600 dark:text-green-400 mt-8">
          Nie znaleziono żadnych przepisów spełniających kryteria wyszukiwania.
        </p>
      )}
    </div>
  )
}

