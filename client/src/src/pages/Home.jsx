import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";

function Home() {

    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const res = await api.get("/books");
        setBooks(res.data);
    };

    const searchBooks = async () => {

        if (keyword === "") {
            loadBooks();
            return;
        }

        const res = await api.get(`/books/search/${keyword}`);
        setBooks(res.data);
    };

    return (
        <div className="container mt-4">

            {/* Paste the search bar here */}

            <div className="row mb-4">

                <div className="col-md-8">
                    <input
                        className="form-control"
                        placeholder="Search by title, author or category"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <button
                        className="btn btn-primary w-100"
                        onClick={searchBooks}
                    >
                        Search
                    </button>
                </div>

            </div>

            {/* Book List */}

            <div className="row">

                {books.map((book) => (

                    <div className="col-md-3 mb-4" key={book._id}>
                        <BookCard book={book} />
                    </div>

                ))}

            </div>

        </div>
    );
}

export default Home;