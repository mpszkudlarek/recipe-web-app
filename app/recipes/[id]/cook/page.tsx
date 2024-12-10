"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ChefHat, Clock, Home } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import { getRecipeById, Recipe } from '@/lib/recipes'
import { useParams, useRouter } from 'next/navigation'

export default function CookRecipePage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const fetchedRecipe = getRecipeById(params.id as string)
    if (fetchedRecipe) {
      setRecipe(fetchedRecipe)
    } else {
      router.push('/results')
    }
  }, [params.id, router])

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  if (!recipe) {
    return <div>Loading...</div>
  }

  const progress = (completedSteps.length / recipe.steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <Link href={`/recipes/${params.id}`} className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="text-lg font-medium">Powrót do przepisu</span>
        </Link>
        <h1 className="text-3xl font-bold flex items-center text-gray-800 dark:text-gray-200">
          <ChefHat className="mr-3 h-8 w-8 text-green-500" />
          Gotowanie: {recipe.name}
        </h1>
      </div>

      <Card className="bg-gray-50 dark:bg-gray-800 border-green-200 dark:border-green-700 shadow-lg">
        <CardHeader className="bg-gray-50 dark:bg-gray-900">
          <CardTitle className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <Clock className="mr-3 h-6 w-6" />
            Postęp gotowania
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Śledź swój postęp i zaznaczaj ukończone kroki
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-400">
              <span>Ukończone kroki</span>
              <span className="font-semibold">{completedSteps.length} z {recipe.steps.length}</span>
            </div>
            <Progress 
              value={progress} 
              className="w-full h-3 bg-gray-200 dark:bg-gray-700" 
            />
          </div>

          <div className="space-y-4">
            {recipe.steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Checkbox
                  id={`step-${index}`}
                  checked={completedSteps.includes(index)}
                  onCheckedChange={() => toggleStep(index)}
                  className="mt-1 border-2 border-gray-500 text-blue-500 focus:border-blue-500 focus:ring-blue-300 dark:border-gray-400 dark:text-blue-400 dark:focus:border-blue-400 dark:focus:ring-blue-700"
                />
                <label
                  htmlFor={`step-${index}`}
                  className={`flex-grow cursor-pointer ${completedSteps.includes(index) ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  <span className="font-medium text-gray-600 dark:text-gray-400">Krok {index + 1}:</span> {step}
                </label>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end items-center">
        <Button 
          disabled={completedSteps.length !== recipe.steps.length}
          onClick={() => setIsFinished(true)}
          className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors"
        >
          Zakończ gotowanie
        </Button>
      </div>

      {isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-8 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">Gratulacje! Ukończyłeś przepis!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Dziękujemy za skorzystanie z naszego przepisu. Mamy nadzieję, że danie Ci smakowało!</p>
              <div className="flex justify-center">
                <Link href="/">
                  <Button variant="outline" className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Powrót do strony głównej
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

