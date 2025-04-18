// app/questionnaire/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories } from "@/utils/repairData"

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
                <div>
                    <h2 className="text-[24px] font-semibold mb-4">Choisissez une catégorie</h2>
                    <p className="text-[14px]">T-shirt, jean, veste… sélectionne ta pièce préférée à réparer.</p>
                    <div className="grid gap-4">
                        {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => handleSelect("category", cat.key)}
                            className={cn(
                            "w-full border p-4 rounded-md flex items-center gap-4 text-left",
                            {
                                "border-green-500 bg-green-50": data.category === cat.key,
                            }
                            )}
                        >
                            <img src={cat.icon} alt={cat.label} className="w-10 h-10" />
                            <div>
                            <p className="font-semibold">{cat.label}</p>
                            <p className="text-sm italic text-muted-foreground">{cat.desc}</p>
                            </div>
                        </button>
                        ))}
                    </div>
                </div>
                
            )
        case 1:
            const selectedCategory = categories.find((c) => c.key === data.category)
            if (!selectedCategory) return null

            return (
                <div>
                    <h2 className="text-[24px] font-semibold mb-4">Ta pièce, c’est quoi ?</h2>
                    <p className="text-[14px]">Pour mieux t’aider, choisis la type de ton vêtement. </p>
                    <div className="grid gap-4">
                    {selectedCategory.types.map((type) => (
                        <Button
                        key={type}
                        variant={isSelected(type, data.type) ? "default" : "outline"}
                        onClick={() => handleSelect("type", type)}
                        >
                        {type}
                        </Button>
                    ))}
                    </div>
                </div>
                
            )
        case 2:
            return (
                <div>
                    <h2 className="text-[24px] font-semibold mb-4">Où est le problème ?</h2>
                    <p className="text-[14px]">Trou, fermeture cassée, couture décousue… précise la zone à réparer.</p>
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
                </div>
                
            )
        case 3:
            return (
                <div>
                    <h2 className="text-[24px] font-semibold mb-4">Avec quoi tu veux réparer ?</h2>
                    <p className="text-[14px]">On adapte les tutos à ton matériel pour que tu puisses commencer tout de suite.</p>
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
                </div>
                
            )
        case 4:
            return (
                <div>
                    <h2 className="text-[24px] font-semibold mb-4">Quel est ton niveau ?</h2>
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
