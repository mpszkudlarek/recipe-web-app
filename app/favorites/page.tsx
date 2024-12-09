"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Clock, Users, HelpCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getAllRecipes, Recipe } from '@/lib/recipes'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [sortBy, setSortBy] = useState<string>('dateAdded')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    const allRecipes = getAllRecipes()
    const favoriteRecipes = allRecipes.filter(recipe => favorites.includes(recipe.id))
    setRecipes(favoriteRecipes)
  }, [favorites])

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
      <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-300 flex items-center">
        Ulubione przepisy
        <div className="relative ml-2 group transition-transform duration-300 ease-in-out hover:scale-110">
          <HelpCircle className="w-5 h-5 text-green-600 dark:text-green-400 cursor-help transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-300" />
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-white dark:bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tutaj znajdziesz wszystkie przepisy, które dodałeś do ulubionych. Możesz je łatwo przeglądać i zarządzać nimi.
            </p>
          </div>
        </div>
      </h1>

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
              <SelectItem value="zupa">Zupy</SelectItem>
              <SelectItem value="danie główne">Dania główne</SelectItem>
              <SelectItem value="deser">Desery</SelectItem>
              <SelectItem value="napoj">Napoje</SelectItem>
              <SelectItem value="śniadania">Śniadania</SelectItem>
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
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 cursor-default hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800 dark:hover:text-green-100">{recipe.type}</Badge>
                  {recipe.meat && recipe.meat !== 'none' && (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 cursor-default hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100">{recipe.meat}</Badge>
                  )}
                  {recipe.diet && recipe.diet !== 'none' && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 cursor-default hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800 dark:hover:text-blue-100">{recipe.diet}</Badge>
                  )}
                  {recipe.allergens && recipe.allergens.length > 0 && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 cursor-default hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800 dark:hover:text-yellow-100">
                      Alergeny: {recipe.allergens.join(', ')}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Clock className="h-4 w-4" />
                    {recipe.cookingTime} min
                  </span>
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Users className="h-4 w-4" />
                    {recipe.servings} porcji
                  </span>
                  <span className="flex items-center gap-1 text-red-500 dark:text-red-400">
                    <Heart className="h-4 w-4 fill-current" />
                    {recipe.likes + 1}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Link href={`/recipes/${recipe.id}`}>
                <Button variant="outline" size="sm" className="text-green-700 hover:bg-green-100 hover:text-green-800 dark:text-green-300 dark:hover:bg-green-800 dark:hover:text-green-100">
                  Zobacz przepis
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFavorite(recipe.id)}
                className="text-red-500 hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300"
              >
                Usuń z ulubionych
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {displayedRecipes.length === 0 && (
        <p className="text-center text-gray-900 dark:text-gray-100 mt-8">
          Nie znaleziono żadnych ulubionych przepisów spełniających kryteria wyszukiwania.
        </p>
      )}
    </div>
  )
}


