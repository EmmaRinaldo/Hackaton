"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import logo from "@/public/logo-patchme.svg"

export default function Navbar() {
  const { data: session } = useSession()

  const NavLinks = () => (
    <>
      {session ? (
        <>
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => signOut()}
          >
            Déconnexion
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start">
              Connexion
            </Button>
          </Link>
          <Link href="/register">
            <Button className="w-full justify-start">
              Créer un compte
            </Button>
          </Link>
        </>
      )}
    </>
  )

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b shadow-sm">
      {/* Logo */}
      <Link href="/" >
        <Image
          src={logo}
          alt="Logo"
          width={80}
          height={80}
          className="mr-2"
        />
      </Link>


      {/* Mobile menu (sheet) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px]">
            <div className="mt-6 flex flex-col space-y-2">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-2">
        <NavLinks />
      </div>
    </nav>
  )
}
