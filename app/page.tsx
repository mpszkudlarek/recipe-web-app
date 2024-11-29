"use client";


import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  const [meatFilter, setMeatFilter] = useState<string>('all')
  const [dietFilter, setDietFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [timeFilter, setTimeFilter] = useState<string>('all')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-blend-overlay bg-green-100/80 dark:bg-green-900/80">
      <div className="bg-white/90 dark:bg-green-950/90 p-8 rounded-lg backdrop-blur-sm w-full max-w-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-8 text-center">Znajdź swój idealny przepis</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <Label htmlFor="meat" className="text-green-700 dark:text-green-300">Mięso</Label>
            <Select value={meatFilter} onValueChange={setMeatFilter}>
              <SelectTrigger id="meat" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="drob">Drób</SelectItem>
                <SelectItem value="wolowina">Wołowina</SelectItem>
                <SelectItem value="wieprzowina">Wieprzowina</SelectItem>
                <SelectItem value="owoce-morza">Owoce morza</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="diet" className="text-green-700 dark:text-green-300">Dieta</Label>
            <Select value={dietFilter} onValueChange={setDietFilter}>
              <SelectTrigger id="diet" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="wege">Wege</SelectItem>
                <SelectItem value="wegetarianskie">Wegetariańskie</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="type" className="text-green-700 dark:text-green-300">Typ dania</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="zupa">Zupa</SelectItem>
                <SelectItem value="danie-glowne">Danie główne</SelectItem>
                <SelectItem value="deser">Deser</SelectItem>
                <SelectItem value="napoj">Napój</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="time" className="text-green-700 dark:text-green-300">Czas</Label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger id="time" className="bg-green-50 dark:bg-green-800">
                <SelectValue placeholder="Wybierz opcję" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="15">Do 15 min</SelectItem>
                <SelectItem value="30">Do 30 min</SelectItem>
                <SelectItem value="60">Do 1 godz</SelectItem>
                <SelectItem value="more">Powyżej 1 godz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Label htmlFor="search" className="text-green-700 dark:text-green-300">Szukaj</Label>
            <Input id="search" placeholder="Wpisz składnik lub nazwę przepisu..." className="w-full bg-green-50 dark:bg-green-800" />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Szukaj</Button>
        </div>
      </div>
    </div>
  )
}

