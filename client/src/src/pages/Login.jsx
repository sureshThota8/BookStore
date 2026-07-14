import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const submit = async (e) => {

    e.preventDefault();

    try {

        const res = await api.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        navigate("/");

        window.location.reload();

    } catch (err) {

        alert(
            err.response?.data?.message || "Login Failed"
        );

    }

};

    return (

        <div className="container mt-5">

            <form onSubmit={submit}>

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

                <button className="btn btn-primary">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;