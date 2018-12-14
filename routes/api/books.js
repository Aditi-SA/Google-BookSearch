const router = require("express").Router();
const controllerForBooks = require("../../controllers/controllerForBooks");

// Matches to /api/books
router.route("/")
    .get(controllerForBooks.findAll)
    .post(controllerForBooks.create);

// Matches to /api/books/:id
router.route("/:id")
    .delete(controllerForBooks.remove);

module.exports = router;