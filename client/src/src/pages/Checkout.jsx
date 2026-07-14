import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout(){

    const navigate = useNavigate();

    const checkout = async()=>{

        await api.post("/orders");

        alert("Order Placed Successfully");

        navigate("/orders");

    };

    return(

        <div className="container mt-5">

            <h2>Checkout</h2>

            <button
                className="btn btn-success"
                onClick={checkout}
            >
                Place Order
            </button>

        </div>

    );

}

export default Checkout;