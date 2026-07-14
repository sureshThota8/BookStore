import { useCart } from "../context/CartContext";

function Cart() {

const {

cart,
removeFromCart,
increaseQty,
decreaseQty

}=useCart();

const total=cart.reduce(

(sum,item)=>

sum+(item.book.price*item.quantity),

0

);

return(

<div className="container mt-5">

<h2>Shopping Cart</h2>

{

cart.map(item=>(

<div
key={item._id}
className="card p-3 mb-3"
>

<h4>{item.book.title}</h4>

<p>₹ {item.book.price}</p>

<div className="d-flex align-items-center">

<button

className="btn btn-danger"

onClick={()=>decreaseQty(item._id)}

>

-

</button>

<h4 className="mx-3">

{item.quantity}

</h4>

<button

className="btn btn-success"

onClick={()=>increaseQty(item._id)}

>

+

</button>

</div>

<p className="mt-3">

Subtotal :

₹ {item.book.price*item.quantity}

</p>

<button

className="btn btn-warning"

onClick={()=>removeFromCart(item._id)}

>

Remove

</button>

</div>

))

}

<hr/>

<h2>

Grand Total : ₹{total}

</h2>

</div>

);

}

export default Cart;