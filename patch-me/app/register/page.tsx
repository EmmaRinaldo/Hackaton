"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    nom: "",
    prenom: "",
    pseudo: "",
    password: "",
    materiel: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        materiel: form.materiel.split(",").map((item) => item.trim()),
      }),
    })

    if (res.ok) {
      router.push("/login")
    } else {
      const data = await res.json()
      alert(data.error || "Erreur lors de l'inscription.")
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Créer un compte</h1>
      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input name="nom" placeholder="Nom" onChange={handleChange} />
      <Input name="prenom" placeholder="Prénom" onChange={handleChange} />
      <Input name="pseudo" placeholder="Pseudo" onChange={handleChange} />
      <Input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
      <Input name="materiel" placeholder="Matériel (ex: fil, aiguille)" onChange={handleChange} />
      <Button onClick={handleSubmit} className="w-full">S'inscrire</Button>
    </div>
  )
}
