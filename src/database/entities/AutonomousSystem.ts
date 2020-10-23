import mongoose, { Schema, Document } from 'mongoose'

export type IAutonomousSystem = Document & {
  number: number
  peer: string
  createdAt?: Date
  updatedAt?: Date
}

const AutonomousSystemSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true
    },
    peer: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<AutonomousSystem>(
  'AutonomousSystem',
  AutonomousSystemSchema
)
