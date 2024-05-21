/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToWishlistFn } from "../functions/addToWishlistFn";
import { useAddToWishlistMutation, useGetWishlistQuery } from "../redux/productsSlice";
import { addFavourite, removeFavourite } from "../redux/FavouriteSlice";

export default function AddToWishlist({ prodId }) {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch()
  const favourite = useSelector(state=>state.favourite);
  const favor = favourite.find(ele=>ele._id === prodId)
  // console.log(favorite)
  return (
    <button
      className="absolute top-1 right-1 shadow-lg bg-white p-2 text-red-600  text-2xl rounded-full"
      onClick={()=>addToWishlistFn(prodId,favor,dispatch,setLoad)}
      disabled={load}
    >
      {favor ? <><IoHeart /></> : <><IoHeartOutline/></>}
    </button>
  );
}
