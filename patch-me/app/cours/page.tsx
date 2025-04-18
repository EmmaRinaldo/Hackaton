// app/cours/page.tsx
import dynamic from "next/dynamic"
import { Suspense } from "react"

// Import du composant client avec suspense
const CoursClient = dynamic(() => import("./CoursClient"), { ssr: false })

export default function CoursPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Chargement...</div>}>
      <CoursClient />
    </Suspense>
  )
}
