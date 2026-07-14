import { useEffect, useState } from "react";
import api from "../services/api";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const res = await api.get("/admin/users");

        setUsers(res.data);

    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        await api.delete(`/admin/users/${id}`);

        loadUsers();

    };

    const changeRole = async (id) => {

        await api.put(`/admin/users/${id}`);

        loadUsers();

    };

    return (

        <div className="container mt-5">

            <h2>Manage Users</h2>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map(user => (

                            <tr key={user._id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <span
                                        className={
                                            user.role === "admin"
                                                ? "badge bg-success"
                                                : "badge bg-secondary"
                                        }
                                    >
                                        {user.role}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => changeRole(user._id)}
                                    >
                                        Change Role
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ManageUsers;