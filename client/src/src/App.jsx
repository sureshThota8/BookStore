import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AddBook from "./pages/AddBook";
import ManageBooks from "./pages/ManageBooks";
import EditBook from "./pages/EditBook";
import ManageOrders from "./pages/ManageOrders";
import ManageUsers from "./pages/ManageUsers";
function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/orders" element={<Orders />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-book" element={<AddBook />} />
                <Route path="/admin/manage-books" element={<ManageBooks />} />
                <Route path="/admin/edit-book/:id" element={<EditBook />} />
                <Route path="/admin/orders" element={<ManageOrders />} />
                <Route path="/admin/users" element={<ManageUsers />} />
            </Routes>

        </>

    );

}

export default App;