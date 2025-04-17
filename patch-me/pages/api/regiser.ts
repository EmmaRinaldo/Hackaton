// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { connectToDatabase } from "@/lib/mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { email, pseudo, password } = req.body

  if (!email || !pseudo || !password) {
    return res.status(400).json({ message: "Champs requis manquants." })
  }

  await connectToDatabase()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({ message: "Email déjà utilisé." })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    email,
    pseudo,
    password: hashedPassword,
    materiel: []
  })

  return res.status(201).json({ message: "Inscription réussie." })
}
