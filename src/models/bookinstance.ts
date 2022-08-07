import { Schema, model, Types } from "mongoose"

interface IBookInstance {
  book: Types.ObjectId
  imprint: string
  status: "Available" | "Maintenance" | "Loaned" | "Reserved"
  due_back: Date
}

const BookInstanceSchema = new Schema<IBookInstance>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
})

BookInstanceSchema.virtual("url").get(function () {
  return "/catalog/bookinstance/" + this._id
})

const BookInstance = model<IBookInstance>("BookInstance", BookInstanceSchema)
export default BookInstance
