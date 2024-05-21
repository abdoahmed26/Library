/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import { addCart } from "../functions/addToCart";

export default function AddToCart({ ele }) {
  const cart = useSelector(state=>state.cart);
  const pro = cart.cartItems?.find(item=>item.product._id===ele._id)
  const [isLoading, setLoading] = useState(false);
  const myUrl = useNavigate();
  const dispatch = useDispatch();
  return pro ? (
    <button onClick={() => addCart(ele,myUrl,dispatch,setLoading)} className="text-2xl text-red-900">
      {isLoading ? "loading" : <FaCartArrowDown />}
    </button>
  ) : (
    <button onClick={() => addCart(ele,myUrl,dispatch,setLoading)} className="text-2xl text-green-900">
      <FaCartPlus />
    </button>
  );
}
