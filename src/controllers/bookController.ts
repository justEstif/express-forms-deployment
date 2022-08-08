import async from "async"
import { RequestHandler } from "express"

import Book, { IBook } from "../models/book"
import Author from "../models/author"
import Genre from "../models/genre"
import BookInstance, { IBookInstance } from "../models/bookinstance"

// homepage
export const index: RequestHandler = (_, res) => {
  async.parallel(
    // countDocuments -> returns count
    {
      book_count(callback) {
        Book.countDocuments({}, callback)
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
    (err, results) => {
      res.render("index", {
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
    .populate("author") // get the authors
    .exec((err, list_books) => {
      if (err) return next(err)
      res.render("book_list", { title: "Book List", book_list: list_books })
    })
}

// Display detail page for a specific book.
export const book_detail: RequestHandler = (req, res, next) => {
  interface IResult extends async.Dictionary<unknown> {
    book: IBook
    book_instance: IBookInstance[]
  }
  async.parallel(
    {
      book(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback)
      },
      book_instance(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback)
      },
    },
    function(err, results) {
      if (err) return next(err)
      else if (results.book == null) {
        const err = new Error("Book not found")
        res.status(404)
        return next(err)
      } else {
        const result = results as IResult
        res.render("book_detail", {
          title: result.book.title,
          book: result.book,
          book_instances: result.book_instance,
        })
      }
    }
  )
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
