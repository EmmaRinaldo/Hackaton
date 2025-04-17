import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { email, nom, prenom, pseudo, password, materiel } = req.body

  try {
    await connectToDatabase()

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: "Cet email est déjà utilisé." })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      nom,
      prenom,
      pseudo,
      password: hashedPassword,
      materiel,
    })

    return res.status(201).json({ success: true, user: newUser })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Une erreur est survenue." })
  }
}
