import { Suspense } from "react"
import CoursClient from "./CoursClient"

export default function CoursPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Chargement des résultats...</div>}>
      <CoursClient />
    </Suspense>
  )
}
