"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Clock, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getAllRecipes, Recipe } from '@/lib/recipes'

interface FeaturedRecipesProps {
  selectedCategory: string;
}

export function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => getAllRecipes().slice(0, 3))

  //const filteredRecipes = recipes.filter(recipe => {
  //  if (selectedCategory === 'Śniadania') return recipe.type === 'śniadania';
  //  if (selectedCategory === 'Obiady') return recipe.type === 'danie główne';
  //  if (selectedCategory === 'Desery') return recipe.type === 'deser';
  //  if (selectedCategory === 'Wegetariańskie') return recipe.diet === 'wegetarianskie' || recipe.diet === 'wege';
  //  if (selectedCategory === 'Szybkie dania') return recipe.cookingTime <= 15;
  //  return true;
  //}).slice(0, 3);
  const filteredRecipes = recipes;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredRecipes.map((recipe) => (
        <Card key={recipe.id} className="recipe-card animate-fade-in">
          <CardContent className="p-0">
            <Image
              src={recipe.image || `/placeholder.svg?height=200&width=400`}
              alt={recipe.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="recipe-title">{recipe.name}</h2>
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
              <div className="recipe-meta flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recipe.cookingTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recipe.servings} porcji
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  {recipe.likes}
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
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

