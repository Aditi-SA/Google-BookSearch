const router = require("express").Router();
const bookRoutes = require("./books");

// Routes at /books/
router.use("/books", bookRoutes);

module.exports = router;