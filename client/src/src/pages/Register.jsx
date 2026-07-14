import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const submit = async (e) => {

        e.preventDefault();

        await api.post("/auth/register", form);
        alert("Registration Successful");
        navigate("/login");

    };

    return (

        <div className="container mt-5">

            <form onSubmit={submit}>

                <input
                    className="form-control mb-3"
                    placeholder="Name"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                />

                <button className="btn btn-success">
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;