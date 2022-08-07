import mongoose from "mongoose"

interface IAuthor {
  first_name: string
  family_name: string
  date_of_birth?: Date
  date_of_death?: Date
}

const AuthorSchema = new mongoose.Schema<IAuthor>({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
})

AuthorSchema.virtual("name").get(function () {
  if (this.first_name && this.family_name) {
    return `${this.family_name}, ${this.first_name}`
  } else {
    return ""
  }
})

AuthorSchema.virtual("lifespan").get(function () {
  if (this.date_of_birth && this.date_of_death) {
    return `${this.date_of_birth
      .getFullYear()
      .toString()} - ${this.date_of_death.getFullYear().toString()}`
  } else if (this.date_of_birth) {
    return this.date_of_birth.getFullYear().toString()
  } else {
    return ""
  }
})

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id
})

export default mongoose.model<IAuthor>("Author", AuthorSchema)
