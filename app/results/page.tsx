"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Clock, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getAllRecipes, Recipe } from '@/lib/recipes'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useFavorites } from '@/contexts/FavoritesContext'

type SortOption = 'all' | 'newest' | 'likes' | 'time-asc' | 'time-desc' | 'servings-asc' | 'servings-desc'
type MeatFilter = 'all' | 'drob' | 'wolowina' | 'wieprzowina' | 'owoce-morza' | 'brak'
type DietFilter = 'all' | 'wege' | 'wegetarianskie' | 'keto' | 'none'
type TypeFilter = 'all' | 'zupa' | 'danie główne' | 'deser' | 'napoj' | 'śniadania'
type TimeFilter = 'all' | '15' | '30' | '60' | '60+'
type ServingsFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'więcej'
type AllergenFilter = 'all' | 'gluten' | 'orzechy' | 'laktoza' | 'jaja' | 'soja' | 'ryby' | 'skorupiaki'

export default function ResultsPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => getAllRecipes())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortOption>('all')
  const [meatFilter, setMeatFilter] = useState<MeatFilter>('all')
  const [dietFilter, setDietFilter] = useState<DietFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')
  const [servingsFilter, setServingsFilter] = useState<ServingsFilter>('all')
  const [allergenFilter, setAllergenFilter] = useState<AllergenFilter>('all')

  const searchParams = useSearchParams()
  const router = useRouter()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    const dietParam = params.get('diet');
    const timeParam = params.get('time');
    const searchParam = params.get('search');

    if (typeParam) setTypeFilter(typeParam as TypeFilter);
    if (dietParam) setDietFilter(dietParam as DietFilter);
    if (timeParam) setTimeFilter(timeParam as TimeFilter);
    if (searchParam) setSearchTerm(searchParam);

    // Fetch recipes and apply filters
    const allRecipes = getAllRecipes();
    setRecipes(allRecipes);
  }, []);


  const applyFilters = useCallback(() => {
    let filteredRecipes = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (meatFilter === 'all' || recipe.meat === meatFilter) &&
      (dietFilter === 'all' || recipe.diet === dietFilter) &&
      (typeFilter === 'all' || recipe.type === typeFilter) &&
      (timeFilter === 'all' || 
        (timeFilter === '15' && recipe.cookingTime <= 15) ||
        (timeFilter === '30' && recipe.cookingTime <= 30) ||
        (timeFilter === '60' && recipe.cookingTime <= 60) ||
        (timeFilter === '60+' && recipe.cookingTime > 60)
      ) &&
      (servingsFilter === 'all' || 
        (servingsFilter === 'więcej' && recipe.servings > 8) ||
        (recipe.servings === parseInt(servingsFilter))
      ) &&
      (allergenFilter === 'all' || (recipe.allergens && !recipe.allergens.includes(allergenFilter)))
    )

    switch (sortBy) {
      case 'newest':
        filteredRecipes.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case 'likes':
        filteredRecipes.sort((a, b) => b.likes - a.likes)
        break
      case 'time-asc':
        filteredRecipes.sort((a, b) => a.cookingTime - b.cookingTime)
        break
      case 'time-desc':
        filteredRecipes.sort((a, b) => b.cookingTime - a.cookingTime)
        break
      case 'servings-asc':
        filteredRecipes.sort((a, b) => a.servings - b.servings)
        break
      case 'servings-desc':
        filteredRecipes.sort((a, b) => b.servings - a.servings)
        break
    }

    return filteredRecipes
  }, [recipes, searchTerm, sortBy, meatFilter, dietFilter, typeFilter, timeFilter, servingsFilter, allergenFilter]);

  const filteredAndSortedRecipes = applyFilters()

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (sortBy !== 'all') params.set('sort', sortBy)
    if (meatFilter !== 'all') params.set('meat', meatFilter)
    if (dietFilter !== 'all') params.set('diet', dietFilter)
    if (typeFilter !== 'all') params.set('type', typeFilter)
    if (timeFilter !== 'all') params.set('time', timeFilter)
    if (servingsFilter !== 'all') params.set('servings', servingsFilter)
    if (allergenFilter !== 'all') params.set('allergen', allergenFilter)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl, { scroll: false })
  }, [searchTerm, sortBy, meatFilter, dietFilter, typeFilter, timeFilter, servingsFilter, allergenFilter, router])

  useEffect(() => {
    updateSearchParams()
  }, [searchTerm, sortBy, meatFilter, dietFilter, typeFilter, timeFilter, servingsFilter, allergenFilter, updateSearchParams])

  useEffect(() => {
    //This effect is no longer needed since we are using context
  }, [])

  useEffect(() => {
    //This effect is no longer needed since we are using context
  }, [])


  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Wszystkie przepisy</h1>
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
              Tutaj znajdziesz wszystkie przepisy dostępne w naszej bazie. Możesz je filtrować i sortować według swoich preferencji.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <Label htmlFor="sort">Sortuj według</Label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger id="sort" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="newest">Najnowsze</SelectItem>
                <SelectItem value="likes">Liczba polubień</SelectItem>
                <SelectItem value="time-asc">Czas przygotowania (rosnąco)</SelectItem>
                <SelectItem value="time-desc">Czas przygotowania (malejąco)</SelectItem>
                <SelectItem value="servings-asc">Liczba porcji (rosnąco)</SelectItem>
                <SelectItem value="servings-desc">Liczba porcji (malejąco)</SelectItem>
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
                <SelectItem value="brak">Brak</SelectItem>
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
                <SelectItem value="none">Brak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Label htmlFor="type">Typ dania</Label>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
              <SelectTrigger id="type" className="w-[180px] bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Filtruj według typu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="śniadania">Śniadania</SelectItem>
                <SelectItem value="zupa">Zupy</SelectItem>
                <SelectItem value="danie główne">Dania główne</SelectItem>
                <SelectItem value="deser">Desery</SelectItem>
                <SelectItem value="napoj">Napoje</SelectItem>
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
          <div className="w-full md:w-auto">
            <Label htmlFor="servings">Liczba porcji</Label>
            <Select value={servingsFilter} onValueChange={(value) => setServingsFilter(value as ServingsFilter)}>
              <SelectTrigger id="servings" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="1">1 porcja</SelectItem>
                <SelectItem value="2">2 porcje</SelectItem>
                <SelectItem value="3">3 porcje</SelectItem>
                <SelectItem value="4">4 porcje</SelectItem>
                <SelectItem value="5">5 porcji</SelectItem>
                <SelectItem value="6">6 porcji</SelectItem>
                <SelectItem value="7">7 porcji</SelectItem>
                <SelectItem value="8">8 porcji</SelectItem>
                <SelectItem value="więcej">Więcej niż 8</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Label htmlFor="allergens">Alergeny</Label>
            <Select value={allergenFilter} onValueChange={(value) => setAllergenFilter(value as AllergenFilter)}>
              <SelectTrigger id="allergens" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="gluten">Bez glutenu</SelectItem>
                <SelectItem value="orzechy">Bez orzechów</SelectItem>
                <SelectItem value="laktoza">Bez laktozy</SelectItem>
                <SelectItem value="jaja">Bez jaj</SelectItem>
                <SelectItem value="soja">Bez soi</SelectItem>
                <SelectItem value="ryby">Bez ryb</SelectItem>
                <SelectItem value="skorupiaki">Bez skorupiaków</SelectItem>
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
            onChange={(e) => {
              setSearchTerm(e.target.value)
              updateSearchParams()
            }}
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
                <div className="flex items-center gap-4 mt-4 text-sm text-green-600 dark:text-green-400">
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Clock className="h-4 w-4" />
                    {recipe.cookingTime} min
                  </span>
                  <span 
                    className="flex items-center gap-1 text-black dark:text-white cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-110" 
                    onClick={() => {
                      toggleFavorite(recipe.id);
                      setRecipes(prevRecipes =>
                        prevRecipes.map(r =>
                          r.id === recipe.id ? { ...r, likes: r.likes + (isFavorite(recipe.id) ? -1 : 1) } : r
                        )
                      );
                    }}
                    title={isFavorite(recipe.id) ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isFavorite(recipe.id) 
                          ? 'fill-red-500 text-red-500 group-hover:fill-red-600 group-hover:text-red-600' 
                          : 'text-red-500 group-hover:text-red-600'
                      }`} 
                    />
                    <span className="transition-colors duration-300 group-hover:text-red-600">
                      {recipe.likes + (isFavorite(recipe.id) ? 1 : 0)}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-black dark:text-white">
                    <Users className="h-4 w-4" />
                    {recipe.servings} porcji
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
                onClick={() => {
                  toggleFavorite(recipe.id);
                  setRecipes(prevRecipes =>
                    prevRecipes.map(r =>
                      r.id === recipe.id ? { ...r, likes: r.likes + (isFavorite(recipe.id) ? -1 : 1) } : r
                    )
                  );
                }}
                className={`flex items-center gap-2 ${
                  isFavorite(recipe.id)
                    ? 'bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800'
                    : 'text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
                {isFavorite(recipe.id) ? 'Polubiono' : 'Polub'}
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


