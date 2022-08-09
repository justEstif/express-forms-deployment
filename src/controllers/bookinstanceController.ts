import { RequestHandler } from "express"

import BookInstance from "../models/bookinstance"
import { IBook } from "../models/book"

// Display: Request list of _ BookInstances.
export const bookinstance_list: RequestHandler = (_, res, next) => {
  BookInstance.find()
    .populate("book") // book id -> full Book doc
    .exec(function(err, list_bookinstances) {
      if (err) return next(err)
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      })
    })
}

// Display detail page for a specific BookInstance.
export const bookinstance_detail: RequestHandler = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate("book") // get book info
    .exec(function(err, bookinstance) {
      if (err) return next(err)
      else if (bookinstance == null) {
        const err = new Error("Book copy not found")
        res.status(404)
        return next(err)
      } else {
        let book: IBook = bookinstance.book as IBook
        res.render("bookinstance_detail", {
          title: book.title,
          bookinstance,
        })
      }
    })
}

// Display BookInstance create form on GET.
export const bookinstance_create_get: RequestHandler = (_, res, next) => {
  Book.find({}, "title").exec((err, books) => {
    if (err) return next(err)

    // Successful, so render.
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    })
  })
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
