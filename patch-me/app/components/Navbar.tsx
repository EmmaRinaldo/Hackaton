"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b shadow-sm">
      <Link href="/" className="text-xl font-bold">
        PatchMe
      </Link>
      <div className="flex items-center space-x-2">
        {session ? (
          <>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button variant="ghost" onClick={() => signOut()}>
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button>Créer un compte</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
