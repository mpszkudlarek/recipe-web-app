"use client"

import { useState } from "react"
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

export default function AddRecipePage() {
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const [image, setImage] = useState<string | null>(null)

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

  return (
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        <h1 className="text-3xl font-bold">Dodaj nowy przepis</h1>

        <form className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nazwa przepisu</Label>
                <Input id="name" placeholder="Wprowadź nazwę przepisu" />
              </div>

              <div className="space-y-2">
                <Label>Zdjęcie</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {image ? (
                      <img src={image} alt="Podgląd przepisu" className="mx-auto max-h-64 object-contain" />
                  ) : (
                      <Button variant="outline" className="mx-auto" onClick={() => document.getElementById('image-upload')?.click()}>
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
                <Label htmlFor="description">Opis dania</Label>
                <Textarea id="description" placeholder="Krótki opis przepisu" />
              </div>

              <div className="space-y-2">
                <Label>Składniki</Label>
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
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeIngredient(index)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addIngredient}>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj składnik
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Sposób przygotowania</Label>
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
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeStep(index)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addStep}>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj krok
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Alergeny</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Gluten', 'Laktoza', 'Orzechy', 'Jaja', 'Soja', 'Ryby', 'Skorupiaki'].map((allergen) => (
                      <div key={allergen} className="flex items-center space-x-2">
                        <Checkbox id={`allergen-${allergen}`} />
                        <Label htmlFor={`allergen-${allergen}`}>{allergen}</Label>
                      </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Anuluj</Button>
            <Button type="submit">Opublikuj przepis</Button>
          </div>
        </form>
      </div>
  )
}

