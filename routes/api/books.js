const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches to /api/books
router.route("/")
    .get(booksController.findAll)
    .post(booksController.create);

// Matches to /api/books/:id
router.route("/:id")
    .delete(booksController.remove);

module.exports = router;