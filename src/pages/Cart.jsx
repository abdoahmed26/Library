/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import FullCart from "../components/FullCart";
import { useGetCartQuery } from "../redux/productsSlice"
import { useEffect, useState } from "react";
import { deleteAll, getBook } from "../redux/CartSlice";

const Cart = () => {
  const { data, isError, isLoading } = useGetCartQuery();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  if(data){
    console.log(data)
    dispatch(getBook(data.data.cartItems))
  }
  return (
    <div className="py-5">
      {isLoading ? (
        <div className="flex justify-center">
          <span className="inline-block border-2 border-black rounded-full w-7 h-7 border-l-gray-500 animate-spin"></span>
        </div>
      ) : cart.length > 0 ? (
        <FullCart />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
