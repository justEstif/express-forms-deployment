import { model, Schema } from "mongoose"

const AuthorSchema = new Schema({
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

export default model("Author", AuthorSchema)
