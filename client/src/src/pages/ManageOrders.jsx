import { useEffect, useState } from "react";
import api from "../services/api";

function ManageOrders(){

const [orders,setOrders]=useState([]);

useEffect(()=>{

loadOrders();

},[]);

const loadOrders=async()=>{

const res=await api.get("/admin/orders");

setOrders(res.data);

};

const changeStatus=async(id,status)=>{

await api.put(`/admin/orders/${id}`,{
status
});

loadOrders();

};

const deleteOrder=async(id)=>{

if(!window.confirm("Delete Order?")) return;

await api.delete(`/admin/orders/${id}`);

loadOrders();

};

return(

<div className="container mt-5">

<h2>Manage Orders</h2>

<table className="table table-bordered">

<thead>

<tr>

<th>Customer</th>

<th>Total</th>

<th>Status</th>

<th>Books</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

orders.map(order=>(

<tr key={order._id}>

<td>

{order.user?.name}

<br/>

<small>{order.user?.email}</small>

</td>

<td>

₹{order.total}

</td>

<td>

<select

className="form-select"

value={order.status}

onChange={(e)=>

changeStatus(

order._id,

e.target.value

)

}

>

<option>Pending</option>

<option>Processing</option>

<option>Shipped</option>

<option>Delivered</option>

</select>

</td>

<td>

{

order.items.map(item=>(

<div key={item.book?._id}>

{item.book?.title}

x {item.quantity}

</div>

))

}

</td>

<td>

<button

className="btn btn-danger"

onClick={()=>deleteOrder(order._id)}

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

export default ManageOrders;