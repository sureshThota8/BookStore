import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        books: 0,
        users: 0,
        orders: 0,
        revenue: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const res = await api.get("/admin/dashboard");

            setStats(res.data);

        } catch (err) {

            console.log(err);

            alert("Unable to load dashboard");

        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        window.location.reload();

    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Admin Dashboard</h1>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            {/* Dashboard Cards */}

            <div className="row">

                <div className="col-md-3 mb-3">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h4>Total Books</h4>

                            <h1>{stats.books}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h4>Users</h4>

                            <h1>{stats.users}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h4>Orders</h4>

                            <h1>{stats.orders}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h4>Revenue</h4>

                            <h1>₹{stats.revenue}</h1>

                        </div>

                    </div>

                </div>

            </div>

            <hr />

            <h3 className="mb-4">Management</h3>

            <div className="row">

                <div className="col-md-3 mb-3">

                    <Link
                        to="/admin/add-book"
                        className="btn btn-success w-100"
                    >
                        ➕ Add Book
                    </Link>

                </div>

                <div className="col-md-3 mb-3">

                    <Link
                        to="/admin/manage-books"
                        className="btn btn-primary w-100"
                    >
                        📚 Manage Books
                    </Link>

                </div>

                <div className="col-md-3 mb-3">

                    <Link
                        to="/admin/orders"
                        className="btn btn-warning w-100"
                    >
                        📦 Manage Orders
                    </Link>

                </div>

                <div className="col-md-3 mb-3">

                    <Link
                        to="/admin/users"
                        className="btn btn-dark w-100"
                    >
                        👥 Manage Users
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;