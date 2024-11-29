"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Clock, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

type Recipe = {
  id: string
  name: string
  image: string
  likes: number
  cookingTime: number
  dateAdded: string
  type: 'soup' | 'main dish' | 'dessert' | 'cocktail'
  servings: number
}

const mockRecipes: Recipe[] = [
  { id: '1', name: 'Tomato Soup', image: '/placeholder.svg', likes: 120, cookingTime: 30, dateAdded: '2023-11-15', type: 'soup', servings: 4 },
  { id: '2', name: 'Chicken Curry', image: '/placeholder.svg', likes: 85, cookingTime: 45, dateAdded: '2023-11-10', type: 'main dish', servings: 4 },
  { id: '3', name: 'Chocolate Cake', image: '/placeholder.svg', likes: 200, cookingTime: 60, dateAdded: '2023-11-05', type: 'dessert', servings: 8 },
  { id: '4', name: 'Mojito', image: '/placeholder.svg', likes: 150, cookingTime: 5, dateAdded: '2023-11-01', type: 'cocktail', servings: 1 },
  { id: '5', name: 'Vegetable Stir Fry', image: '/placeholder.svg', likes: 95, cookingTime: 20, dateAdded: '2023-10-28', type: 'main dish', servings: 2 },
]

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes)
  const [sortBy, setSortBy] = useState<string>('dateAdded')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const sortRecipes = (recipes: Recipe[], sortBy: string) => {
    return [...recipes].sort((a, b) => {
      switch (sortBy) {
        case 'dateAdded':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case 'likes':
          return b.likes - a.likes
        case 'cookingTime':
          return a.cookingTime - b.cookingTime
        case 'alphabetical':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }

  const filterAndSortRecipes = () => {
    let filteredRecipes = recipes
    if (filterType !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.type === filterType)
    }
    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return sortRecipes(filteredRecipes, sortBy)
  }

  const displayedRecipes = filterAndSortRecipes()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-300">Ulubione przepisy</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-green-50 dark:bg-green-800">
              <SelectValue placeholder="Sortuj według" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateAdded">Data dodania</SelectItem>
              <SelectItem value="likes">Liczba polubień</SelectItem>
              <SelectItem value="cookingTime">Czas przygotowania</SelectItem>
              <SelectItem value="alphabetical">Alfabetycznie</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px] bg-green-50 dark:bg-green-800">
              <SelectValue placeholder="Filtruj według typu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              <SelectItem value="soup">Zupy</SelectItem>
              <SelectItem value="main dish">Dania główne</SelectItem>
              <SelectItem value="dessert">Desery</SelectItem>
              <SelectItem value="cocktail">Koktajle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Input
          type="search"
          placeholder="Szukaj przepisu..."
          className="max-w-sm bg-green-50 dark:bg-green-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedRecipes.map((recipe) => (
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
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.cookingTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings} porcji
                  </span>
                  <span className="flex items-center gap-1">
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
      
      {displayedRecipes.length === 0 && (
        <p className="text-center text-green-600 dark:text-green-400 mt-8">
          Nie znaleziono żadnych przepisów spełniających kryteria wyszukiwania.
        </p>
      )}
    </div>
  )
}

