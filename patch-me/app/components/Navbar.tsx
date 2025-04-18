"use client"

import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import logo from "@/public/logo-patchme.svg"

export default function Navbar() {
  const NavLinks = () => (
    <>
      <Link href="/questionnaire">
        <span className="block px-4 py-2 text-sm">Questionnaire</span>
      </Link>
      <Link href="/cours">
        <span className="block px-4 py-2 text-sm">Cours</span>
      </Link>
    </>
  )

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b shadow-sm">
      {/* Logo */}
      <Link href="/">
        <Image
          src={logo}
          alt="Logo PatchMe"
          width={80}
          height={80}
          className="mr-2"
        />
      </Link>

      {/* Icône loupe */}
      <Link href="/cours">
        <Image
          src="/icon-loupe.svg"
          alt="Rechercher"
          width={24}
          height={24}
        />
      </Link>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="ml-2">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] pt-10">
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLinks />
      </div>
    </nav>
  )
}
