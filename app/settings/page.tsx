import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Ustawienia użytkownika</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" alt="Zdjęcie profilowe" />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <Button>Zmień zdjęcie</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Imię i nazwisko</Label>
              <Input id="name" defaultValue="Jan Kowalski" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jan.kowalski@example.com" />
            </div>
            <Button>Zapisz zmiany</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferencje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Język</Label>
              <select id="language" className="w-full p-2 border rounded">
                <option>Polski</option>
                <option>English</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="units">Jednostki miary</Label>
              <select id="units" className="w-full p-2 border rounded">
                <option>Metryczne</option>
                <option>Imperialne</option>
              </select>
            </div>
            <Button>Zapisz preferencje</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

