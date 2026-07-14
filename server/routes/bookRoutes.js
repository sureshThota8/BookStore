const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../config/multer");


// =========================
// GET ALL BOOKS
// =========================
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        res.json(books);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// =========================
// SEARCH BOOKS
// IMPORTANT:
// This route must come BEFORE /:id
// =========================
router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = req.params.keyword;

        const books = await Book.find({

            $or: [

                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    author: {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    category: {
                        $regex: keyword,
                        $options: "i"
                    }
                }

            ]

        });

        res.json(books);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// =========================
// GET SINGLE BOOK
// =========================
router.get("/:id", async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// =========================
// ADD BOOK
// =========================
router.post(
    "/",
    auth,
    admin,
    upload.single("image"),
    async (req, res) => {

        try {

            const book = new Book({

                title: req.body.title,

                author: req.body.author,

                category: req.body.category,

                description: req.body.description,

                price: req.body.price,

                stock: req.body.stock,

                image: req.file ? req.file.filename : ""

            });

            await book.save();

            res.status(201).json(book);

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);


// =========================
// UPDATE BOOK
// =========================
router.put(
    "/:id",
    auth,
    admin,
    upload.single("image"),
    async (req, res) => {

        try {

            const updateData = {

                title: req.body.title,

                author: req.body.author,

                category: req.body.category,

                description: req.body.description,

                price: req.body.price,

                stock: req.body.stock

            };

            if (req.file) {
                updateData.image = req.file.filename;
            }

            const book = await Book.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true
                }
            );

            if (!book) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.json(book);

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);


// =========================
// DELETE BOOK
// =========================
router.delete(
    "/:id",
    auth,
    admin,
    async (req, res) => {

        try {

            const book = await Book.findById(req.params.id);

            if (!book) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            await Book.findByIdAndDelete(req.params.id);

            res.json({
                message: "Book deleted successfully"
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);

module.exports = router;