"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ChefHat } from "lucide-react";
import Link from "next/link";

const steps = [
  "Przygotuj składniki: pokrój warzywa, zmierz odpowiednie ilości przypraw.",
  "Rozgrzej piekarnik do 180°C.",
  "W dużej misce wymieszaj wszystkie suche składniki.",
  "W osobnej misce ubij jajka z mlekiem i olejem.",
  "Połącz mokre składniki z suchymi, mieszając do uzyskania jednolitej konsystencji.",
  "Przełóż ciasto do formy wyłożonej papierem do pieczenia.",
  "Piecz przez 45 minut lub do suchego patyczka.",
  "Wyjmij z piekarnika i odstaw do ostygnięcia na 10 minut.",
  "Pokrój i podawaj. Smacznego!",
];

export default function CookRecipePage({ params }: { params: { id: string } }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
        prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          {/* Use `params.id` dynamically */}
          <Link
              href={`/recipes/${params.id}`}
              className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do przepisu
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            <ChefHat className="mr-2 h-6 w-6" />
            Gotowanie: Nazwa przepisu
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Postęp</span>
                <span>
                {completedSteps.length} z {steps.length} kroków
              </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Checkbox
                        id={`step-${index}`}
                        checked={completedSteps.includes(index)}
                        onCheckedChange={() => toggleStep(index)}
                    />
                    <label
                        htmlFor={`step-${index}`}
                        className={`flex-grow ${
                            completedSteps.includes(index)
                                ? "line-through text-muted-foreground"
                                : ""
                        }`}
                    >
                      <span className="font-medium">Krok {index + 1}:</span>{" "}
                      {step}
                    </label>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline">Wstrzymaj gotowanie</Button>
          <Button
              disabled={completedSteps.length !== steps.length}
              onClick={() => alert("Gratulacje! Ukończyłeś przepis!")}
          >
            Zakończ gotowanie
          </Button>
        </div>
      </div>
  );
}
