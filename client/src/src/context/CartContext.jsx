import {createContext,useContext,useEffect,useState} from "react";
import api from "../services/api";

const CartContext=createContext();

export const CartProvider=({children})=>{

const [cart,setCart]=useState([]);

const loadCart=async()=>{

try{

const res=await api.get("/cart");

setCart(res.data);

}catch(err){

console.log(err);

}

};

const addToCart=async(bookId)=>{

await api.post("/cart",{bookId});

loadCart();

};
const increaseQty = async(id)=>{

    await api.put(`/cart/increase/${id}`);

    loadCart();

};

const decreaseQty = async(id)=>{

    await api.put(`/cart/decrease/${id}`);

    loadCart();

};

const removeFromCart=async(id)=>{

await api.delete(`/cart/${id}`);

loadCart();

};

useEffect(()=>{

if(localStorage.getItem("token")){

loadCart();

}

},[]);

return(

<CartContext.Provider

value={

{

cart,

addToCart,

removeFromCart,
increaseQty,
decreaseQty

}

}

>

{children}

</CartContext.Provider>

);

};

export const useCart=()=>useContext(CartContext);