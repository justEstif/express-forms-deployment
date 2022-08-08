import { RequestHandler } from "express"

import BookInstance from "../models/bookinstance"

// Display: Reques list of _ BookInstances.
export const bookinstance_list: RequestHandler = (_, res, next) => {
  BookInstance.find()
    .populate("book") // book id -> full Book doc
    .exec(function (err, list_bookinstances) {
      if (err) return next(err)
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      })
    })
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
