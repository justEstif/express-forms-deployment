import { Types, Schema, model } from "mongoose"

interface IBook {
  title: string
  author: Types.ObjectId
  summary: string
  isbn: string
  genre: Types.ObjectId
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
})

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  return "/catalog/book/" + this._id
})

const Book = model<IBook>("Book", BookSchema)
export default Book
