"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle } from 'lucide-react'

interface UserSettings {
  name: string;
  email: string;
  avatar: string;
  language: string;
  units: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    avatar: "/placeholder.svg",
    language: "pl",
    units: "metric"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Saving settings:', settings)
    // Here you would typically send the settings to an API
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Ustawienia użytkownika</h1>
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
              Na tej stronie możesz dostosować swoje ustawienia konta, w tym dane osobowe, preferencje językowe i jednostki miary.
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-300">Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={settings.avatar} alt="Zdjęcie profilowe" />
                <AvatarFallback>{settings.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button 
                className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                Zmień zdjęcie
              </Button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Imię i nazwisko</Label>
              <Input id="name" name="name" value={settings.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={settings.email} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-300">Preferencje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Język</Label>
              <Select value={settings.language} onValueChange={(value) => handleSelectChange('language', value)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Wybierz język" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pl">Polski</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="units">Jednostki miary</Label>
              <Select value={settings.units} onValueChange={(value) => handleSelectChange('units', value)}>
                <SelectTrigger id="units">
                  <SelectValue placeholder="Wybierz jednostki" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metryczne</SelectItem>
                  <SelectItem value="imperial">Imperialne</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">Zapisz preferencje</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

