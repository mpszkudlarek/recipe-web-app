"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ImagePlus, Plus, Minus } from 'lucide-react'
import { Recipe, addRecipe } from '@/lib/recipes'

export default function AddRecipePage() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const [image, setImage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [servings, setServings] = useState('')
  const [type, setType] = useState<Recipe['type']>('danie główne')
  const [meat, setMeat] = useState<Recipe['meat']>('none')
  const [diet, setDiet] = useState<Recipe['diet']>('none')
  const [allergens, setAllergens] = useState<string[]>([])

  const addIngredient = () => setIngredients([...ingredients, ''])
  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(newIngredients)
  }

  const addStep = () => setSteps([...steps, ''])
  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index)
    setSteps(newSteps)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Check if all required fields are filled
    if (!name || !description || !cookingTime || !servings || ingredients.some(i => !i) || steps.some(s => !s)) {
      alert("Proszę wypełnić wszystkie pola.")
      return
    }

    // Check if cookingTime and servings are positive
    if (parseInt(cookingTime) <= 0 || parseInt(servings) <= 0) {
      alert("Czas przygotowania i liczba porcji muszą być większe od zera.")
      return
    }

    const newRecipe: Recipe = {
      id: Date.now().toString(),
      name,
      image: image || '/placeholder.svg',
      description,
      cookingTime: parseInt(cookingTime),
      servings: parseInt(servings),
      type,
      meat,
      diet,
      likes: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      allergens,
      ingredients: ingredients.map(ingredient => ({ name: ingredient, amount: '' })),
      steps,
      comments: [],
    }
    addRecipe(newRecipe)
    router.push('/results')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Dodaj nowy przepis</h1>
        <div className="relative ml-2 group transition-transform duration-300 ease-in-out hover:scale-110">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
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
              Tutaj możesz dodać nowy przepis do naszej bazy. Wypełnij wszystkie pola, aby podzielić się swoim kulinarnym dziełem z innymi.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nazwa przepisu</Label>
              <Input 
                id="name" 
                placeholder="Wprowadź nazwę przepisu" 
                className="bg-gray-50 dark:bg-gray-700" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Zdjęcie</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                {image ? (
                  <img src={image} alt="Podgląd przepisu" className="mx-auto max-h-64 object-contain" />
                ) : (
                  <Button variant="outline" className="mx-auto text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => document.getElementById('image-upload')?.click()}>
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Dodaj zdjęcie
                  </Button>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Opis dania</Label>
              <Textarea 
                id="description" 
                placeholder="Krótki opis przepisu" 
                className="bg-gray-50 dark:bg-gray-700" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cookingTime" className="text-gray-700 dark:text-gray-300">Czas przygotowania (min)</Label>
                <Input 
                  id="cookingTime" 
                  type="number" 
                  placeholder="Czas w minutach" 
                  className="bg-gray-50 dark:bg-gray-700" 
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servings" className="text-gray-700 dark:text-gray-300">Liczba porcji</Label>
                <Input 
                  id="servings" 
                  type="number" 
                  placeholder="Liczba porcji" 
                  className="bg-gray-50 dark:bg-gray-700" 
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">Typ dania</Label>
                <Select value={type} onValueChange={(value: Recipe['type']) => setType(value)}>
                  <SelectTrigger id="type" className="bg-gray-50 dark:bg-gray-700">
                    <SelectValue placeholder="Wybierz typ dania" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zupa">Zupa</SelectItem>
                    <SelectItem value="danie główne">Danie główne</SelectItem>
                    <SelectItem value="deser">Deser</SelectItem>
                    <SelectItem value="napoj">Napój</SelectItem>
                    <SelectItem value="śniadania">Śniadanie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meat" className="text-gray-700 dark:text-gray-300">Mięso</Label>
                <Select value={meat} onValueChange={(value: Recipe['meat']) => setMeat(value)}>
                  <SelectTrigger id="meat" className="bg-gray-50 dark:bg-gray-700">
                    <SelectValue placeholder="Wybierz rodzaj mięsa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drob">Drób</SelectItem>
                    <SelectItem value="wolowina">Wołowina</SelectItem>
                    <SelectItem value="wieprzowina">Wieprzowina</SelectItem>
                    <SelectItem value="owoce-morza">Owoce morza</SelectItem>
                    <SelectItem value="none">Brak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet" className="text-gray-700 dark:text-gray-300">Dieta</Label>
              <Select value={diet} onValueChange={(value: Recipe['diet']) => setDiet(value)}>
                <SelectTrigger id="diet" className="bg-gray-50 dark:bg-gray-700">
                  <SelectValue placeholder="Wybierz dietę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wege">Wege</SelectItem>
                  <SelectItem value="wegetarianskie">Wegetariańskie</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="none">Brak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Składniki</Label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => {
                      const newIngredients = [...ingredients]
                      newIngredients[index] = e.target.value
                      setIngredients(newIngredients)
                    }}
                    placeholder={`Składnik ${index + 1}`}
                    className="bg-gray-50 dark:bg-gray-700"
                    required
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeIngredient(index)} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addIngredient} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj składnik
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Sposób przygotowania</Label>
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Textarea
                    value={step}
                    onChange={(e) => {
                      const newSteps = [...steps]
                      newSteps[index] = e.target.value
                      setSteps(newSteps)
                    }}
                    placeholder={`Krok ${index + 1}`}
                    className="bg-gray-50 dark:bg-gray-700"
                    required
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeStep(index)} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addStep} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj krok
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Alergeny</Label>
              <div className="grid grid-cols-2 gap-2">
                {['gluten', 'laktoza', 'orzechy', 'jaja', 'soja', 'ryby', 'skorupiaki'].map((allergen) => (
                  <div key={allergen} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`allergen-${allergen}`} 
                      className="border-gray-300 text-green-600 focus:border-green-300 focus:ring-green-200 dark:border-gray-600 dark:text-green-400 dark:focus:border-green-700 dark:focus:ring-green-900"
                      checked={allergens.includes(allergen)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAllergens([...allergens, allergen])
                        } else {
                          setAllergens(allergens.filter(a => a !== allergen))
                        }
                      }}
                    />
                    <Label htmlFor={`allergen-${allergen}`} className="text-gray-700 dark:text-gray-300 capitalize">{allergen}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => router.push('/results')}>Anuluj</Button>
          <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300">Opublikuj przepis</Button>
        </div>
      </form>
    </div>
  )
}

