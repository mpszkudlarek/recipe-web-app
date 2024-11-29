export type Recipe = {
  id: string
  name: string
  image: string
  cookingTime: number
  servings: number
  type: 'zupa' | 'danie-glowne' | 'deser' | 'napoj'
  meat: 'drob' | 'wolowina' | 'wieprzowina' | 'owoce-morza' | 'none'
  diet: 'wege' | 'wegetarianskie' | 'keto' | 'none'
  likes: number
  dateAdded: string
}

const mockRecipes: Recipe[] = [
  { 
    id: '1', 
    name: 'Kremowa zupa pomidorowa', 
    image: '/placeholder.svg', 
    cookingTime: 30, 
    servings: 4, 
    type: 'zupa',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 120,
    dateAdded: '2023-11-15'
  },
  { 
    id: '2', 
    name: 'Spaghetti Bolognese', 
    image: '/placeholder.svg', 
    cookingTime: 45, 
    servings: 6, 
    type: 'danie-glowne',
    meat: 'wolowina',
    diet: 'none',
    likes: 85,
    dateAdded: '2023-11-10'
  },
  { 
    id: '3', 
    name: 'Sałatka Cezar z kurczakiem', 
    image: '/placeholder.svg', 
    cookingTime: 20, 
    servings: 2, 
    type: 'danie-glowne',
    meat: 'drob',
    diet: 'none',
    likes: 95,
    dateAdded: '2023-11-05'
  },
  { 
    id: '4', 
    name: 'Smoothie owocowe', 
    image: '/placeholder.svg', 
    cookingTime: 5, 
    servings: 1, 
    type: 'napoj',
    meat: 'none',
    diet: 'wege',
    likes: 150,
    dateAdded: '2023-11-01'
  },
  { 
    id: '5', 
    name: 'Pieczone warzywa', 
    image: '/placeholder.svg', 
    cookingTime: 35, 
    servings: 4, 
    type: 'danie-glowne',
    meat: 'none',
    diet: 'wege',
    likes: 75,
    dateAdded: '2023-10-28'
  },
  { 
    id: '6', 
    name: 'Tiramisu', 
    image: '/placeholder.svg', 
    cookingTime: 30, 
    servings: 8, 
    type: 'deser',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 200,
    dateAdded: '2023-10-25'
  },
]

export function getRandomRecipe(): Recipe | null {
  if (mockRecipes.length === 0) {
    return null
  }
  const randomIndex = Math.floor(Math.random() * mockRecipes.length)
  return mockRecipes[randomIndex]
}

export function getAllRecipes(): Recipe[] {
  return mockRecipes
}

