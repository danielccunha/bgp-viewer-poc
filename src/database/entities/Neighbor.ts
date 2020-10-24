import mongoose, { Schema, Document } from 'mongoose'

export type INeighbor = Document & {
  from: number
  to: number
  createdAt?: Date
  updatedAt?: Date
}

const NeighborSchema = new Schema(
  {
    from: {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<INeighbor>('Neighbor', NeighborSchema)
