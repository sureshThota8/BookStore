import { Link } from "react-router-dom";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    Book Store
                </Link>


                <div>

                    <Link className="btn btn-light me-2" to="/">
                        Home
                    </Link>

                    {!user && (
                        <>
                            <Link className="btn btn-warning me-2" to="/login">
                                Login
                            </Link>

                            <Link className="btn btn-success me-2" to="/register">
                                Register
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <Link className="btn btn-info me-2" to="/cart">
                                Cart
                            </Link>

                            <Link className="btn btn-danger me-2" to="/orders">
                                Orders
                            </Link>

                            <Link className="btn btn-warning me-2" to="/checkout">
                                Checkout
                            </Link>

                            {/* Show only for admin */}
                            {user.role === "admin" && (
                                <Link
                                    className="btn btn-dark me-2"
                                    to="/admin"
                                >
                                    Admin
                                </Link>
                            )}
                            {user && (
                                <span className="text-white me-3">
                                    Welcome, {user.name}
                                </span>
                            )}

                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;