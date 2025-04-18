"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { videos } from "@/utils/videosData"

export default function CoursPage() {
  const searchParams = useSearchParams()
  const [filtered, setFiltered] = useState<typeof videos>([])
  const [filters, setFilters] = useState({
    type: "",
    issue: "",
    level: "",
    tools: [] as string[],
  })

  useEffect(() => {
    if (!searchParams) return // ✅ protection contre null

    const selectedType = searchParams!.get("type") || ""
    const selectedIssue = searchParams!.get("issue") || ""
    const selectedLevel = searchParams!.get("level") || ""
    const selectedTools = searchParams!.getAll("tools")

    setFilters({
      type: selectedType,
      issue: selectedIssue,
      level: selectedLevel,
      tools: selectedTools,
    })

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

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-700">
        Résultat des recherches
      </h1>

      {/* Filtres affichés */}
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

      {/* Liste des vidéos */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filtered.map((video) => (
            <Link
              key={video.id}
              href={`/cours/${video.id}`}
              className="rounded-xl overflow-hidden shadow-sm border transition hover:shadow-md"
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
              <div className="p-4">
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
