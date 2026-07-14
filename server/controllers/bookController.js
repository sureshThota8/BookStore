exports.searchBooks = async (req, res) => {
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
};