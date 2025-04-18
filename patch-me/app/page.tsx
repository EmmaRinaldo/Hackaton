"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#D21515] to-[#A40000] text-white py-16 px-6 text-center">
        <p className="uppercase text-sm mb-2 tracking-widest font-light">
          Apprends à réparer, crée, partage
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-4">
          Reprend tes outils<br />et finis ton œuvre
        </h1>
        <Link href="/questionnaire">
          <Button className="text-base px-6 py-3 mt-2">Commencer un tuto</Button>
        </Link>
      </section>

      {/* Cours populaires */}
      <section className="px-4 py-8">
        <h2 className="uppercase text-sm font-bold text-gray-700 mb-4">
          Les cours populaires
        </h2>
        <div className="flex gap-4 overflow-x-scroll pb-4">
          {/* Exemple de carte */}
          <div className="relative min-w-[220px] rounded-xl overflow-hidden shadow-sm border bg-cover bg-center" style={{ backgroundImage: 'url(/bg-cours.svg)' }}>
            <Image
              src="https://img.youtube.com/vi/abc123/0.jpg"
              alt="Miniature"
              width={300}
              height={180}
              className="w-full h-[120px] object-cover"
            />
            <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded-full font-semibold">
              10 MIN
            </div>
            <div className="p-3 text-white bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-sm font-bold">Recoudre un ourlet en 3 minutes</h3>
              <div className="flex flex-wrap gap-1 mt-1 text-xs">
                <span className="px-2 py-1 rounded-full bg-white text-black">Aiguille</span>
                <span className="px-2 py-1 rounded-full bg-white text-black">Ciseaux</span>
                <span className="px-2 py-1 rounded-full bg-white text-black">Fil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Événements */}
      <section className="px-4 pb-12">
        <h2 className="uppercase text-sm font-bold text-gray-700 mb-4">
          Nos formations
        </h2>
        <div className="bg-[#D21515] text-white rounded-xl p-4">
          <p className="text-xs mb-1">24 Mai – Paris, France</p>
          <h3 className="text-sm font-bold">Ateliers By The Way</h3>
          <p className="text-xs italic mb-2">Éco-responsabilité • Réparation Event</p>
          <Link href="#" className="text-white underline text-sm">
            En savoir plus →
          </Link>
        </div>
      </section>
    </div>
  )
}
