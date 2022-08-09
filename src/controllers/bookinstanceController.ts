import { RequestHandler, Response, Request, NextFunction } from "express"
import { body, validationResult } from "express-validator"

import BookInstance from "../models/bookinstance"
import Book, { IBook } from "../models/book"

// Display: Request list of _ BookInstances.
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
export const bookinstance_detail: RequestHandler = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate("book") // get book info
    .exec(function (err, bookinstance) {
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
export const bookinstance_create_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a BookInstance object with escaped and trimmed data.
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Book.find({}, "title").exec(function (err, books) {
        if (err) return next(err)

        // Successful, so render.

        let book: IBook = bookinstance.book as IBook
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: book._id,
          errors: errors.array(),
          bookinstance: bookinstance,
        })
      })
      return
    } else {
      // Data from form is valid.
      bookinstance.save(function (err) {
        if (err) return next(err)

        // Successful - redirect to new record.
        res.redirect(bookinstance.url)
      })
    }
  },
]

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
