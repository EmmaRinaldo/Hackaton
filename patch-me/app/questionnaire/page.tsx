// app/questionnaire/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories } from "@/utils/repairData"

const steps = ["Catégorie", "Type", "Problème", "Matériel", "Niveau"]

const allTools = [
  "Ruban adhésif", "Machine à coudre", "Aiguille à coudre", "Mètre ruban",
  "Ciseaux", "Ruban élastique", "Patches décoratifs", "Dé à coudre",
  "Colle textile", "Épingles", "Ruban"
]

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
    // Rediriger ou envoyer vers une API
  }

  const canProceed = () => {
    switch (step) {
      case 0: return !!data.category
      case 1: return !!data.type
      case 2: return !!data.issue
      case 3: return data.tools.length > 0
      case 4: return !!data.level
      default: return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Tu veux réparer quoi ?</h2>
            <p className="text-sm mb-6">T-shirt, jean, veste… sélectionne ta pièce préférée à réparer.</p>
            <div className="grid gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleSelect("category", cat.key)}
                  className={cn(
                    "w-full border px-4 py-3 rounded-xl flex items-center gap-4 text-left transition-all",
                    {
                      "border-green-600 bg-green-50": data.category === cat.key,
                    }
                  )}
                >
                  <img src={cat.icon} alt={cat.label} className="w-10 h-10 object-contain" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{cat.label}</p>
                    <p className="text-xs italic text-gray-500">{cat.desc}</p>
                  </div>
                  {data.category === cat.key && (
                    <img src="/icon-ok.svg" alt="ok" className="w-5 h-5" />
                  )}
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
            <h2 className="text-xl font-semibold mb-4">Ta pièce, c’est quoi ?</h2>
            <p className="text-sm mb-6">Pour mieux t’aider, choisis le type de ton vêtement.</p>
            <div className="grid gap-3">
              {selectedCategory.types.map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelect("type", type)}
                  className={cn(
                    "w-full border px-4 py-3 rounded-xl flex items-center justify-between text-left transition",
                    {
                      "border-green-600 bg-green-50": data.type === type,
                    }
                  )}
                >
                  <span className="font-medium text-sm">{type}</span>
                  {data.type === type && (
                    <img src="/icon-ok.svg" alt="ok" className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )
  
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Où est le problème ?</h2>
            <p className="text-sm mb-6">Trou, fermeture cassée, couture décousue… précise la zone à réparer.</p>
            <div className="grid gap-3">
              {[
                "Zip / Fermeture",
                "Trou / Accroc / Déchirure",
                "Couture Décousue",
                "Pression / Attaches / Velcro"
              ].map((issue) => (
                <button
                  key={issue}
                  onClick={() => handleSelect("issue", issue)}
                  className={cn(
                    "w-full border px-4 py-3 rounded-xl flex items-center justify-between text-left transition",
                    {
                      "border-green-600 bg-green-50": data.issue === issue,
                    }
                  )}
                >
                  <span className="font-medium text-sm">{issue}</span>
                  {data.issue === issue && (
                    <img src="/icon-ok.svg" alt="ok" className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )
  
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Avec quoi tu veux réparer ?</h2>
            <p className="text-sm mb-6">On adapte les tutos à ton matériel pour que tu puisses commencer tout de suite.</p>
            <div className="flex flex-wrap gap-2">
              {allTools.map((tool) => (
                <button
                  key={tool}
                  onClick={() => handleSelect("tools", tool)}
                  className={cn(
                    "border px-4 py-2 rounded-full text-sm transition",
                    {
                      "bg-green-50 border-green-600 text-black": data.tools.includes(tool),
                      "border-gray-300 text-black": !data.tools.includes(tool),
                    }
                  )}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        )
  
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Quel est ton niveau ?</h2>
            <div className="grid gap-3">
              {["Débutant", "Intermédiaire", "Expert"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleSelect("level", lvl)}
                  className={cn(
                    "w-full border px-4 py-3 rounded-xl flex items-center justify-between text-left transition",
                    {
                      "border-green-600 bg-green-50": data.level === lvl,
                    }
                  )}
                >
                  <span className="font-medium text-sm">{lvl}</span>
                  {data.level === lvl && (
                    <img src="/icon-ok.svg" alt="ok" className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )
    }
  }
  

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
  
      {/* Barre de navigation avec retour et stepper */}
      <div className="flex items-center gap-2 mb-6">
        {step > 0 && (
          <button onClick={prev}>
            <img src="/icon-back.svg" alt="Retour" className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 h-1 rounded-full bg-gray-200 relative">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all"
            style={{
              width: `${((step + 1) / steps.length) * 100}%`,
              backgroundColor: "#FF6035",
            }}
          />
        </div>
      </div>
  
      {/* Étape en cours */}
      {renderStep()}
  
      {/* Navigation bas */}
      <div className="mt-8 flex justify-between">
        <Button onClick={prev} disabled={step === 0} variant="ghost">
          Précédent
        </Button>
        {step === steps.length - 1 ? (
          <Button onClick={handleSubmit} disabled={!canProceed()}>
            C’est parti !
          </Button>
        ) : (
          <Button onClick={next} disabled={!canProceed()}>
            Suivant
          </Button>
        )}
      </div>
    </div>
  )
  
}
