const db = require("../models");

// Defining methods for the controllerForBooks
module.exports = {
    // matches to /api/books
    findAll: (req, res) => {
        db.Book
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        db.Book
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // matches to /api/books/:id
    remove: (req, res) => {
        db.Book
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove({ _id: req.params.id }))
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};