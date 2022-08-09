import { RequestHandler, Request, Response, NextFunction } from "express"
import async from "async"
import { body, validationResult } from "express-validator"

import Author from "../models/author"
import Book from "../models/book"

// Display list of all Authors.
export const author_list: RequestHandler = (_, res, next) => {
  Author.find()
    .sort({ family_name: 1 })
    .exec(function (err, list_authors) {
      if (err) return next(err)
      res.render("author_list", {
        title: "Author List",
        author_list: list_authors,
      })
    })
}

// Display detail page for a specific Author.
export const author_detail: RequestHandler = (req, res, next) => {
  async.parallel(
    {
      // get author and books of author
      author(callback) {
        Author.findById(req.params.id).exec(callback)
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback)
      },
    },
    (err, results) => {
      // Error in API usage.
      if (err) return next(err)

      switch (results.author) {
        case null:
          const err = new Error("Author not found")
          res.status(404)
          return next(err)
        default:
          res.render("author_detail", {
            title: "Author Detail",
            author: results.author,
            author_books: results.authors_books,
          })
      }
    }
  )
}

// Display Author create form on GET.
export const author_create_get: RequestHandler = (_, res) => {
  res.render("author_form", { title: "Create Author" })
}

// Handle Author create on POST.
export const author_create_post = [
  // Validate and sanitize
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      })
      return
    } else {
      // Data from form is valid.
      const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      })
      author.save((err) => {
        if (err) return next(err)
        res.redirect(author.url)
      })
    }
  },
]

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
