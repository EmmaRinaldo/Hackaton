import mongoose, { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  pseudo: { type: String, required: true },
  password: { type: String, required: true },
  materiel: { type: [String], default: [] },
})

export const User = models.User || model("User", UserSchema)
