import async from "async"
import { RequestHandler } from "express"

import Book from "../models/book"
import Author from "../models/author"
import Genre from "../models/genre"
import BookInstance from "../models/bookinstance"

// homepage
export const index: RequestHandler = (_, res) => {
  async.parallel(
    {
      book_count(callback) {
        Book.countDocuments({}, callback) // empty object = find all
      },
      book_instance_count(callback) {
        BookInstance.countDocuments({}, callback)
      },
      book_instance_available_count(callback) {
        BookInstance.countDocuments({ status: "Available" }, callback)
      },
      author_count(callback) {
        Author.countDocuments({}, callback)
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback)
      },
    },
    function (err, results) {
      res.render("index", {
        // pass the title, err, and data to index.pug
        title: "Local Library Home",
        error: err,
        data: results,
      })
    }
  )
}

// Display list of all books.
export const book_list: RequestHandler = (_, res, next) => {
  Book.find({}, "title author") // select only the title and author
    .sort({ title: 1 }) // sort by title alphabetically
    .populate("author")
    .exec((err, list_books) => {
      if (err) return next(err)
      // render book_list
      res.render("book_list", { title: "Book List", book_list: list_books })
    })
}

// Display detail page for a specific book.
export const book_detail: RequestHandler = (_, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${_.params.id}`)
}

// Display book create form on GET.
export const book_create_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book create GET")
}

// Handle book create on POST.
export const book_create_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book create POST")
}

// Display book delete form on GET.
export const book_delete_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET")
}

// Handle book delete on POST.
export const book_delete_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST")
}

// Display book update form on GET.
export const book_update_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book update GET")
}

// Handle book update on POST.
export const book_update_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book update POST")
}
