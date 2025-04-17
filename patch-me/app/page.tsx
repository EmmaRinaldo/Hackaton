"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { data: session } = useSession()

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {session
          ? `Bienvenue, ${session.user?.name || session.user?.email}`
          : "Répare tes vêtements. Découvre un métier."}
      </h1>
      <p className="text-muted-foreground mb-6 max-w-xl">
        {session
          ? "Commence à apprendre la réparation textile et accumule des badges !"
          : "PatchMe te permet d’apprendre à réparer toi-même tes vêtements, chaussures ou linge."}
      </p>
      <Link href={session ? "/dashboard" : "/login"}>
        <Button className="text-lg px-6 py-3">
          {session ? "Accéder à mon espace" : "Commencer"}
        </Button>
      </Link>
    </section>
  )
}
