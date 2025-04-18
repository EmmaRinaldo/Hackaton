"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { videos } from "@/utils/videosData"
import { categories } from "@/utils/repairData"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

const allTools = [
  "Aiguille à coudre", "Fil", "Ciseaux", "Machine à coudre", "Ruban adhésif",
  "Épingles", "Colle textile", "Mètre ruban", "Dé à coudre", "Ruban", "Patches décoratifs"
]

export default function CoursClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filtered, setFiltered] = useState<typeof videos>([])
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    issue: "",
    level: "",
    tools: [] as string[],
  })

  useEffect(() => {
    if (!searchParams) return

    const selectedType = searchParams.get("type") || ""
    const selectedIssue = searchParams.get("issue") || ""
    const selectedLevel = searchParams.get("level") || ""
    const selectedTools = searchParams.getAll("tools")

    setFilters((prev) => ({
      ...prev,
      type: selectedType,
      issue: selectedIssue,
      level: selectedLevel,
      tools: selectedTools,
      category: categories.find((c) => c.types.includes(selectedType))?.key || "",
    }))

    const match = (video: typeof videos[number]) => {
      const tags = video.tags
      const toolsMatch = selectedTools.every((tool) =>
        tags.tools.includes(tool)
      )

      return (
        (!selectedType || tags.type === selectedType) &&
        (!selectedIssue || tags.issue === selectedIssue) &&
        (!selectedLevel || tags.level === selectedLevel) &&
        toolsMatch
      )
    }

    const result = videos.filter(match)
    setFiltered(result)
  }, [searchParams])

  const handleChange = (key: keyof typeof filters, value: string) => {
    if (key === "tools") {
      setFilters((prev) => ({
        ...prev,
        tools: prev.tools.includes(value)
          ? prev.tools.filter((tool) => tool !== value)
          : [...prev.tools, value],
      }))
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }))
    }
  }

  const applyFilters = () => {
    const query = new URLSearchParams()
    if (filters.type) query.set("type", filters.type)
    if (filters.issue) query.set("issue", filters.issue)
    if (filters.level) query.set("level", filters.level)
    filters.tools.forEach((tool) => query.append("tools", tool))
    router.push(`/cours?${query.toString()}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-700">
          Résultat des recherches
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Modifier les filtres
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="font-semibold text-lg mb-4">Filtres</h2>

            {/* Catégorie */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Catégorie</p>
              {categories.map((cat) => (
                <label key={cat.key} className="block text-sm mb-1">
                  <input
                    type="radio"
                    name="category"
                    value={cat.key}
                    checked={filters.category === cat.key}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        category: cat.key,
                        type: "",
                      }))
                    }
                    className="mr-2"
                  />
                  {cat.label}
                </label>
              ))}
            </div>

            {/* Type */}
            {filters.category && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Type</p>
                {categories
                  .find((c) => c.key === filters.category)
                  ?.types.map((type) => (
                    <label key={type} className="block text-sm mb-1">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={filters.type === type}
                        onChange={() => handleChange("type", type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
              </div>
            )}

            {/* Problème */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Problème</p>
              {Array.from(new Set(videos.map((v) => v.tags.issue))).map((issue) => (
                <label key={issue} className="block text-sm mb-1">
                  <input
                    type="radio"
                    name="issue"
                    value={issue}
                    checked={filters.issue === issue}
                    onChange={() => handleChange("issue", issue)}
                    className="mr-2"
                  />
                  {issue}
                </label>
              ))}
            </div>

            {/* Niveau */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Niveau</p>
              {["Débutant", "Intermédiaire", "Expert"].map((level) => (
                <label key={level} className="block text-sm mb-1">
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    checked={filters.level === level}
                    onChange={() => handleChange("level", level)}
                    className="mr-2"
                  />
                  {level}
                </label>
              ))}
            </div>

            {/* Outils */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-1">Outils disponibles</p>
              <div className="flex flex-wrap gap-2">
                {allTools.map((tool) => (
                  <label key={tool} className="text-xs flex items-center">
                    <input
                      type="checkbox"
                      value={tool}
                      checked={filters.tools.includes(tool)}
                      onChange={() => handleChange("tools", tool)}
                      className="mr-1"
                    />
                    {tool}
                  </label>
                ))}
              </div>
            </div>

            <DialogTrigger asChild>
              <Button onClick={applyFilters} className="w-full">
                Appliquer les filtres
              </Button>
            </DialogTrigger>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres actifs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.type && (
          <span className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {filters.type}
          </span>
        )}
        {filters.issue && (
          <span className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {filters.issue}
          </span>
        )}
        {filters.level && (
          <span className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {filters.level}
          </span>
        )}
        {filters.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs border rounded-full px-3 py-1 bg-gray-100"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Résultats */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filtered.map((video) => (
            <Link
              key={video.id}
              href={`/cours/${video.id}`}
              className="relative rounded-xl overflow-hidden shadow-sm border transition hover:shadow-md bg-cover bg-center"
              style={{ backgroundImage: 'url(/bg-cours.svg)' }}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={`Miniature de ${video.title}`}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded-full font-semibold">
                  {video.duration}
                </div>
              </div>
              <div className="p-4 bg-white bg-opacity-90 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground mb-1">
                  Matériel requis : {video.tags.tools.join(", ")}
                </p>
                <h3 className="font-semibold text-sm leading-tight">
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Aucune vidéo ne correspond aux filtres sélectionnés.
        </p>
      )}
    </div>
  )
}
