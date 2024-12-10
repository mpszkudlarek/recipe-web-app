import { redirect } from 'next/navigation'
import { getRandomRecipe } from '@/lib/recipes'

export default function RandomRecipePage() {
  const recipe = getRandomRecipe()
  
  if (recipe) {
    redirect(`/recipes/${recipe.id}`)
  } else {
    redirect('/results')
  }
}

