// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { connectToDatabase } from "@/lib/mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  try {
    const { email, pseudo, password } = req.body

    if (!email || !pseudo || !password) {
      return res.status(400).json({ message: "Champs requis manquants." })
    }

    await connectToDatabase()

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: "Email déjà utilisé" })

    const hashed = await bcrypt.hash(password, 10)

    await User.create({ email, pseudo, password: hashed, materiel: [] })

    return res.status(201).json({ message: "Inscription réussie" })
  } catch (err: any) {
    console.error("Erreur API Register:", err)
    return res.status(500).json({ message: "Erreur serveur" })
  }
}

