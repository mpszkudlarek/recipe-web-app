"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Heart, MessageSquare, Edit, Trash, AlertTriangle, Leaf } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import Link from "next/link"
import { getRecipeById, Recipe, Comment, addCommentToRecipe } from '@/lib/recipes'
import { updateRecipeInGlobalState } from '@/lib/recipes'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [localComments, setLocalComments] = useState<Comment[]>([])
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const fetchedRecipe = getRecipeById(params.id)
    if (fetchedRecipe) {
      setRecipe(fetchedRecipe)
      setLocalComments(fetchedRecipe.comments)
    }
  }, [params.id])

  const addComment = useCallback(() => {
    if (newComment.trim() && recipe) {
      const newCommentObj: Comment = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user: 'Aktualny użytkownik',
        content: newComment,
        date: new Date().toISOString()
      }
      
      setLocalComments(prevComments => [...prevComments, newCommentObj])
      addCommentToRecipe(recipe.id, newCommentObj)
      setNewComment("")
    }
  }, [newComment, recipe])

  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id)
    setEditedContent(comment.content)
  }

  const saveEdit = () => {
    if (recipe) {
      const updatedComments = recipe.comments.map(comment => 
        comment.id === editingComment 
          ? { ...comment, content: editedContent }
          : comment
      )
      setRecipe({...recipe, comments: updatedComments})
      setLocalComments(updatedComments)
      setEditingComment(null)
    }
  }

  const deleteComment = (id: string) => {
    setLocalComments(prevComments => prevComments.filter(comment => comment.id !== id))
    
    if (recipe) {
      const updatedRecipe = { ...recipe, comments: localComments.filter(comment => comment.id !== id) }
      updateRecipeInGlobalState(updatedRecipe)
    }
  }

  if (!recipe) {
    return <div>Loading...</div>
  }

  const allergenNames: { [key: string]: string } = {
    gluten: "Gluten",
    orzechy: "Orzechy",
    laktoza: "Laktoza",
    jaja: "Jaja",
    soja: "Soja",
    ryby: "Ryby",
    skorupiaki: "Skorupiaki"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">{recipe.name}</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={`transition-colors duration-300 ${
                isFavorite(recipe.id) 
                  ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                  : 'text-red-500 hover:bg-red-100'
              }`}
              onClick={() => toggleFavorite(recipe.id)}
            >
              <Heart className={`h-4 w-4 transition-colors duration-300 ${isFavorite(recipe.id) ? 'fill-red-500' : ''}`} />
            </Button>
            <Link href={`/recipes/${recipe.id}/cook`}>
              <Button className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">Gotuj przepis</Button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">{recipe.type}</Badge>
          <Badge variant="secondary" className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            {recipe.cookingTime} min
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4" />
            {recipe.servings} porcji
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Leaf className="h-4 w-4" />
            {recipe.diet}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`flex items-center gap-1 ${
              isFavorite(recipe.id) 
                ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? 'fill-red-500' : ''}`} />
            <span className={`transition-transform duration-300 ${isFavorite(recipe.id) ? 'scale-110' : 'scale-100'}`}>
              {recipe.likes + (isFavorite(recipe.id) ? 1 : 0)}
            </span>
          </Badge>
        </div>

        {recipe.allergens.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Alergeny
            </h2>
            <div className="flex flex-wrap gap-2">
              {recipe.allergens.map((allergen) => (
                <TooltipProvider key={allergen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700">
                        {allergenNames[allergen]}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ten przepis zawiera {allergenNames[allergen].toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr,300px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Składniki</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{ingredient.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{ingredient.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Przygotowanie</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal list-inside">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="pl-2">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                Komentarze
                <MessageSquare className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {localComments.map((comment, index) => (
                <Card key={`${comment.id}-${index}`} className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="font-semibold">{comment.user}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{new Date(comment.date).toLocaleString()}</div>
                    </div>
                    {editingComment === comment.id ? (
                      <div className="space-y-2">
                        <Textarea 
                          value={editedContent} 
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="w-full"
                        />
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => setEditingComment(null)} variant="outline" size="sm">Anuluj</Button>
                          <Button onClick={saveEdit} size="sm">Zapisz</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <p>{comment.content}</p>
                        <div className="flex gap-2">
                          <Button onClick={() => startEditing(comment)} variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => deleteComment(comment.id)} variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <div className="mt-4 space-y-2">
                <Textarea 
                  placeholder="Dodaj komentarz..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full"
                />
                <Button onClick={addComment} className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors">Dodaj komentarz</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <Image
                src={recipe.image}
                alt={`Zdjęcie ${recipe.name}`}
                width={300}
                height={200}
                className="w-full rounded-lg object-cover"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Opis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

