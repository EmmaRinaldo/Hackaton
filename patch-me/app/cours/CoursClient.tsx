"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { videos } from "@/utils/videosData"

export default function CoursClient() {
  const searchParams = useSearchParams()
  const [filtered, setFiltered] = useState<typeof videos>([])

  useEffect(() => {
    const selectedType = searchParams.get("type")
    const selectedIssue = searchParams.get("issue")
    const selectedLevel = searchParams.get("level")
    const selectedTools = searchParams.getAll("tools")

    const match = (video: typeof videos[number]) => {
      const tags = video.tags
      const toolsMatch = selectedTools.every((t) => tags.tools.includes(t))

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
      <h1 className="text-lg font-bold mb-4">RESULTAT DES RECHERCHES</h1>

      {/* Filtres actifs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {searchParams.get("type") && (
          <span className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {searchParams.get("type")}
          </span>
        )}
        {searchParams.get("issue") && (
          <span className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {searchParams.get("issue")}
          </span>
        )}
        {searchParams.get("level") && (
          <span className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {searchParams.get("level")}
          </span>
        )}
        {searchParams.getAll("tools").map((tool) => (
          <span key={tool} className="text-xs border rounded-full px-3 py-1 bg-gray-100">
            {tool}
          </span>
        ))}
      </div>

      {/* Résultats */}
      <div className="flex flex-col gap-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune vidéo ne correspond aux filtres sélectionnés.</p>
        ) : (
          filtered.map((video) => (
            <Link
              key={video.id}
              href={`/cours/${video.id}`}
              className="rounded-xl overflow-hidden shadow-sm border"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded-full">
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
          ))
        )}
      </div>
    </div>
  )
}
