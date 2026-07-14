import {useEffect,useState} from "react";

import api from "../services/api";

function Orders(){

    const [orders,setOrders]=useState([]);

    useEffect(()=>{

        loadOrders();

    },[]);

    const loadOrders=async()=>{

        const res=await api.get("/orders");

        setOrders(res.data);

    };

    return(

        <div className="container mt-4">

            <h2>My Orders</h2>

            {

                orders.map(order=>(

                    <div
                        key={order._id}
                        className="card p-3 mb-3"
                    >

                        <h5>Order #{order._id}</h5>

                        <h4>Total ₹{order.total}</h4>

                        <p>Status : {order.status}</p>

                        {

                            order.items.map(item=>(

                                <p key={item.book._id}>

                                    {item.book.title}

                                    {" "}x{" "}

                                    {item.quantity}

                                </p>

                            ))

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default Orders;