// import Author from "../models/author"
import { RequestHandler } from "express"

// Display list of all Authors.
export const author_list: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author list")
}

// Display detail page for a specific Author.
export const author_detail: RequestHandler = (_, res) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${_.params.id}`)
}

// Display Author create form on GET.
export const author_create_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author create GET")
}

// Handle Author create on POST.
export const author_create_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author create POST")
}

// Display Author delete form on GET.
export const author_delete_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET")
}

// Handle Author delete on POST.
export const author_delete_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST")
}

// Display Author update form on GET.
export const author_update_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author update GET")
}

// Handle Author update on POST.
export const author_update_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Author update POST")
}
