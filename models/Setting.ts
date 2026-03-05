import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISettingDocument extends Document {
  key: string
  value: string
}

const SettingSchema = new Schema<ISettingDocument>({
  key:   { type: String, required: true, unique: true },
  value: { type: String, required: true },
}, { timestamps: true })

const Setting: Model<ISettingDocument> =
  mongoose.models.Setting ||
  mongoose.model<ISettingDocument>('Setting', SettingSchema)

export default Setting
