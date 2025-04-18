"use client"

import Link from "next/link"
import Image from "next/image"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import logo from "@/public/logo-patchme.svg"

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 border-b shadow-sm bg-white">
      {/* Mobile layout */}
      <div className="flex items-center justify-between md:hidden">
        {/* Loupe */}
        <Link href="/cours">
          <Image
            src="/icon-loupe.svg"
            alt="Rechercher"
            width={24}
            height={24}
          />
        </Link>

        {/* Logo centré */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src={logo}
            alt="Logo PatchMe"
            width={90}
            height={40}
          />
        </Link>

        {/* Hamburger menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] pt-10">
            <nav className="flex flex-col gap-2">
              <Link href="/questionnaire">Questionnaire</Link>
              <Link href="/cours">Cours</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Logo à gauche */}
        <Link href="/">
          <Image
            src={logo}
            alt="Logo PatchMe"
            width={120}
            height={40}
          />
        </Link>

        {/* Liens à droite */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/questionnaire">Questionnaire</Link>
          <Link href="/cours">
            <Image src="/icon-loupe.svg" alt="Rechercher" width={24} height={24} />
          </Link>
        </nav>
      </div>
    </nav>
  )
}
