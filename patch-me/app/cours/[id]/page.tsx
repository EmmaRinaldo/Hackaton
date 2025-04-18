//app/cours/[id]/page.tsx

"use client"

import { useParams } from "next/navigation"
import { videos } from "@/utils/videosData"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CoursDetailPage() {
  const { id } = useParams()
  const video = videos.find((v) => v.id === id)

  if (!video) return notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Miniature vidéo avec lien YouTube */}
      <div className="relative mb-6 rounded-xl overflow-hidden shadow-md">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-[200px] object-cover"
        />
        <Link
          href={video.url}
          target="_blank"
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition"
        >
          <img src="/icon-play.svg" alt="Lire la vidéo" className="w-12 h-12" />
        </Link>
        <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded-full font-semibold">
          {video.duration}
        </div>
      </div>

      {/* Titre et tags */}
      <h1 className="text-lg font-bold mb-2">{video.title}</h1>
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="border rounded-full px-3 py-1 bg-gray-100">{video.tags.level}</span>
        <span className="border rounded-full px-3 py-1 bg-gray-100">{video.tags.type}</span>
        <span className="border rounded-full px-3 py-1 bg-gray-100">{video.tags.issue}</span>
        {video.tags.tools.map((tool) => (
          <span key={tool} className="border rounded-full px-3 py-1 bg-gray-100">
            {tool}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">{video.description}</p>

      {/* Action */}
      <Button className="w-full">Finaliser le cours</Button>
    </div>
  )
}
