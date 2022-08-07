// import BookInstance from "../models/bookinstance"
import { RequestHandler } from "express"

// Display: Reques list of _ BookInstances.
export const bookinstance_list: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance list")
}

// Display detail page for a specific BookInstance.
export const bookinstance_detail: RequestHandler = (_, res) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${_.params.id}`)
}

// Display BookInstance create form on GET.
export const bookinstance_create_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET")
}

// Handle BookInstance create on POST.
export const bookinstance_create_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST")
}

// Display BookInstance delete form on GET.
export const bookinstance_delete_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET")
}

// Handle BookInstance delete on POST.
export const bookinstance_delete_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST")
}

// Display BookInstance update form on GET.
export const bookinstance_update_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET")
}

// Handle bookinstance update on POST.
export const bookinstance_update_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST")
}
