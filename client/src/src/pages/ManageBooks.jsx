import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function ManageBooks(){

const [books,setBooks]=useState([]);

const navigate = useNavigate();

const loadBooks=async()=>{

const res=await api.get("/books");

setBooks(res.data);

};

const deleteBook=async(id)=>{

await api.delete(`/books/${id}`);

loadBooks();

};

useEffect(()=>{

loadBooks();

},[]);

return(

<div className="container mt-5">

<h2>Manage Books</h2>

<table className="table">

<thead>

<tr>

<th>Title</th>

<th>Author</th>

<th>Price</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

books.map(book=>(

<tr key={book._id}>

<td>{book.title}</td>

<td>{book.author}</td>

<td>₹{book.price}</td>

<td>
<button className="btn btn-primary me-2" onClick={()=>navigate(`/admin/edit-book/${book._id}`)}>

Edit

</button>
<button
className="btn btn-danger"
onClick={()=>deleteBook(book._id)}
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

export default ManageBooks;