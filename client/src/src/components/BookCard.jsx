import {useCart} from "../context/CartContext";
function BookCard({ book }) {
const {addToCart} = useCart();
    return (

        <div className="card h-100">

            <img
                src={`http://localhost:5000/uploads/${book.image}`}
                className="card-img-top"
                alt={book.title}
                style={{ height: "300px", objectFit: "cover" }}
            />

            <div className="card-body">

                <h5>{book.title}</h5>

                <p>{book.author}</p>

                <h4>₹ {book.price}</h4>

                <button className="btn btn-primary" onClick={() => addToCart(book._id)}>
                    Add To Cart
                </button>


            </div>

        </div>

    );

}

export default BookCard;