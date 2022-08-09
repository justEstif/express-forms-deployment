import { Schema, model, Types } from "mongoose"

interface IGenre {
  name: string
  url: string
  checked: string
  _id: Types.ObjectId
}
const GenreSchema = new Schema<IGenre>({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
})

GenreSchema.virtual("url").get(function () {
  return "/catalog/genre/" + this._id
})

const Genre = model<IGenre>("Genre", GenreSchema)
export { IGenre }
export default Genre
