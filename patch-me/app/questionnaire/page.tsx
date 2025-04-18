// app/questionnaire/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const steps = ["Catégorie", "Type", "Problème", "Matériel", "Niveau"]

export default function QuestionnairePage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    category: "",
    type: "",
    issue: "",
    tools: [] as string[],
    level: "",
  })

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const isSelected = (val: string, target: string | string[]) =>
    Array.isArray(target) ? target.includes(val) : target === val

  const handleSelect = (key: keyof typeof data, val: string) => {
    if (key === "tools") {
      setData((prev) => ({
        ...prev,
        tools: prev.tools.includes(val)
          ? prev.tools.filter((t) => t !== val)
          : [...prev.tools, val],
      }))
    } else {
      setData((prev) => ({ ...prev, [key]: val }))
    }
  }

  const handleSubmit = () => {
    console.log("Résultat final :", data)
    // redirection ou appel à une API
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-4">
            {["Haut", "Bas", "Accessoire"].map((cat) => (
              <Button
                key={cat}
                variant={isSelected(cat, data.category) ? "default" : "outline"}
                onClick={() => handleSelect("category", cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        )
      case 1:
        return (
          <div className="grid gap-4">
            {["T-shirt", "Pantalon", "Veste"].map((type) => (
              <Button
                key={type}
                variant={isSelected(type, data.type) ? "default" : "outline"}
                onClick={() => handleSelect("type", type)}
              >
                {type}
              </Button>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="grid gap-4">
            {["Zip", "Trou", "Couture"].map((issue) => (
              <Button
                key={issue}
                variant={isSelected(issue, data.issue) ? "default" : "outline"}
                onClick={() => handleSelect("issue", issue)}
              >
                {issue}
              </Button>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="grid gap-4">
            {["Fil", "Aiguille", "Fer à repasser"].map((tool) => (
              <Button
                key={tool}
                variant={isSelected(tool, data.tools) ? "default" : "outline"}
                onClick={() => handleSelect("tools", tool)}
              >
                {tool}
              </Button>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="grid gap-4">
            {["Débutant", "Intermédiaire", "Expert"].map((lvl) => (
              <Button
                key={lvl}
                variant={isSelected(lvl, data.level) ? "default" : "outline"}
                onClick={() => handleSelect("level", lvl)}
              >
                {lvl}
              </Button>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
        {steps.map((s, i) => (
          <div
            key={s}
            className={cn("flex-1 text-center", {
              "font-bold text-black": i === step,
            })}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Étape en cours */}
      {renderStep()}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button onClick={prev} disabled={step === 0} variant="ghost">
          Précédent
        </Button>
        {step === steps.length - 1 ? (
          <Button onClick={handleSubmit}>C’est parti !</Button>
        ) : (
          <Button onClick={next}>Suivant</Button>
        )}
      </div>
    </div>
  )
}
