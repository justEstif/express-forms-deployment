import { RequestHandler } from "express"
import async from "async"

import Genre from "../models/genre"
import Book from "../models/book"

// Display list of all Genre.
export const genre_list: RequestHandler = (_, res, next) => {
  Genre.find()
    .sort({ name: 1 })
    .exec(function(err, list_genres) {
      if (err) return next(err)
      res.render("genre_list", {
        title: "Genre List",
        genre_list: list_genres,
      })
    })
}

// Display detail page for a specific Genre.
export const genre_detail: RequestHandler = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback)
      },

      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback)
      },
    },
    function(err, results) {
      if (err) return next(err)
      else if (results.genre == null) {
        const err = new Error("Genre not found")
        res.status(404)
        return next(err)
      } else {
        res.render("genre_detail", {
          title: "Genre Detail",
          genre: results.genre,
          genre_books: results.genre_books,
        })
      }
    }
  )
}

// Display Genre create form on GET.
export const genre_create_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Genre create GET")
}

// Handle Genre create on POST.
export const genre_create_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Genre create POST")
}

// Display Genre delete form on GET.
export const genre_delete_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET")
}

// Handle Genre delete on POST.
export const genre_delete_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST")
}

// Display Genre update form on GET.
export const genre_update_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET")
}

// Handle Genre update on POST.
export const genre_update_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST")
}
