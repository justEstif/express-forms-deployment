import { RequestHandler } from "express"
import async from "async"

import Author from "../models/author"
import Book from "../models/book"

// Display list of all Authors.
export const author_list: RequestHandler = (_, res, next) => {
  Author.find()
    .sort({ family_name: 1 })
    .exec(function(err, list_authors) {
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
    function(err, results) {
      // Error in API usage.
      if (err) return next(err)
      else if (results.author == null) {
        const err = new Error("Author not found")
        res.status(404)
        return next(err)
      } else {
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
