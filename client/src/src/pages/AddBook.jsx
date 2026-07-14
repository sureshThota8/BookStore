import { useState } from "react";
import api from "../services/api";

function AddBook() {

    const [book, setBook] = useState({
        title: "",
        author: "",
        price: "",
        category: "",
        description: ""
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
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

        try {
            await api.post("/books", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Book Added Successfully!");

            setBook({
                title: "",
                author: "",
                price: "",
                category: "",
                description: ""
            });

            setImage(null);

        } catch (err) {
            console.error(err);
            alert("Error adding book");
        }
    };

    return (
        <div className="container mt-5">

            <h2>Add Book</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Book Title"
                    className="form-control mb-3"
                    value={book.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    className="form-control mb-3"
                    value={book.author}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="form-control mb-3"
                    value={book.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="form-control mb-3"
                    value={book.category}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="form-control mb-3"
                    value={book.description}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button className="btn btn-success">
                    Add Book
                </button>

            </form>

        </div>
    );
}

export default AddBook;