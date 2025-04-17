// models/User.ts
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true },
  password: { type: String, required: true },
  materiel: { type: [String], default: [] }
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
