import async from "async"
import { RequestHandler, Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"

import Book, { IBook } from "../models/book"
import Author from "../models/author"
import Genre, { IGenre } from "../models/genre"
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
    function (err, results) {
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
export const book_create_get: RequestHandler = (_, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  async.parallel(
    {
      authors(callback) {
        Author.find(callback)
      },
      genres(callback) {
        Genre.find(callback)
      },
    },
    function (err, results) {
      if (err) {
        return next(err)
      }
      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres,
      })
    }
  )
}

// Handle book create on POST.
export const book_create_post = [
  // Convert the genre to an array.
  (req: Request, _: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      if (typeof req.body.genre === "undefined") req.body.genre = []
      else req.body.genre = [req.body.genre]
    }
    next()
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Book object with escaped and trimmed data.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          authors(callback) {
            Author.find(callback)
          },
          genres(callback) {
            Genre.find(callback)
          },
        },
        function (err, results) {
          if (err) return next(err)
          // Mark our selected genres as checked.
          let genres = results.genres as IGenre[]

          for (const genre of genres) {
            if (book.genre.includes(genre._id)) {
              genre.checked = "true"
            }
          }

          res.render("book_form", {
            title: "Create Book",
            authors: results.authors,
            genres,
            book: book,
            errors: errors.array(),
          })
        }
      )
      return
    } else {
      // Data from form is valid. Save book.
      book.save(function (err) {
        if (err) return next(err)
        //successful - redirect to new book record.
        res.redirect(book.url)
      })
    }
  },
]

// Display book delete form on GET.
export const book_delete_get: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET")
}

// Handle book delete on POST.
export const book_delete_post: RequestHandler = (_, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST")
}

// Display book update form on GET.
export const book_update_get: RequestHandler = (req, res, next) => {
  // Get book, authors and genres for form.
  async.parallel(
    {
      book(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback)
      },
      authors(callback) {
        Author.find(callback)
      },
      genres(callback) {
        Genre.find(callback)
      },
    },
    function (err, results) {
      if (err) {
        return next(err)
      }
      if (results.book == null) {
        // No results.
        const err = new Error("Book not found")
        res.status(404)
        return next(err)
      }
      // Success.
      // Mark our selected genres as checked.

      let genres: IGenre[] = results.genres as IGenre[]
      for (const genre of genres) {
        let book: IBook = results.book as IBook
        for (const book_genre of book.genre) {
          if (book_genre._id.valueOf() === genre._id.valueOf()) {
            genre.checked = "true"
          }
        }
      }
      res.render("book_form", {
        title: "Update Book",
        authors: results.authors,
        genres: genres,
        book: results.book,
      })
    }
  )
}

// Handle book update on POST.
export const book_update_post = [
  // Convert the genre to an array
  (req: Request, _: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      if (typeof req.body.genre === "undefined") req.body.genre = []
      else req.body.genre = [req.body.genre]
    }
    next()
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Book object with escaped/trimmed data and old id.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id, //This is required, or a new ID will be assigned!
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          authors(callback) {
            Author.find(callback)
          },
          genres(callback) {
            Genre.find(callback)
          },
        },
        function (err, results) {
          if (err) return next(err)

          // Mark our selected genres as checked.
          let genres: IGenre[] = results.genres as IGenre[]
          for (const genre of genres) {
            for (const book_genre of book.genre) {
              if (book_genre._id.valueOf() === genre._id.valueOf()) {
                genre.checked = "true"
              }
            }
          }

          res.render("book_form", {
            title: "Update Book",
            authors: results.authors,
            genres: genres,
            book: book,
            errors: errors.array(),
          })
        }
      )
      return
    } else {
      // Data from form is valid. Update the record.
      Book.findByIdAndUpdate(req.params.id, book, {}, function (err, thebook) {
        if (err) return next(err)

        // Successful - redirect to book detail page.
        if (thebook) res.redirect(thebook.url)
        else console.log("res.redirect(thebook.url) is null")
      })
    }
  },
]
