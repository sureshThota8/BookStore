import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditBook() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        price: "",
        category: "",
        description: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        loadBook();
    }, []);

    const loadBook = async () => {

        const res = await api.get(`/books/${id}`);

        setBook(res.data);

    };

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.name]: e.target.value
        });

    };

    const updateBook = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("title", book.title);
        formData.append("author", book.author);
        formData.append("price", book.price);
        formData.append("category", book.category);
        formData.append("description", book.description);

        if (image) {
            formData.append("image", image);
        }

        await api.put(`/books/${id}`, formData);

        alert("Book Updated");

        navigate("/admin/books");

    };

    return (

        <div className="container mt-5">

            <h2>Edit Book</h2>

            <form onSubmit={updateBook}>

                <input
                    className="form-control mb-3"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="category"
                    value={book.category}
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />

                <button className="btn btn-success">
                    Update Book
                </button>

            </form>

        </div>

    );

}

export default EditBook;