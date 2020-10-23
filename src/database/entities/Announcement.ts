import mongoose, { Schema, Document } from 'mongoose'

export type IAnnouncement = Document & {
  from: number
  to: number
  createdAt?: Date
  updatedAt?: Date
}

const AnnouncementSchema = new Schema(
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

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema)
