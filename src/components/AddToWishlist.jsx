/* eslint-disable react/prop-types */
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../redux/FavouriteSlice";
import { useState } from "react";

export default function AddToWishlist({ prodId }) {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch()
  const favourite = useSelector(state=>state.favourite);
  const favor = favourite.find(ele=>ele._id === prodId)
  // console.log(favorite)
  const addToWishlistFn = () => {
    // console.log("clicked");
    setLoad(true);
    if(favor){
      axios.delete(`https://ecommerce-api-hlp7.onrender.com/api/wishlist/${prodId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      ).then(()=>dispatch(removeFavourite(prodId))).finally(()=>setLoad(false))
    }
    else{
      axios
        .post(
          "https://ecommerce-api-hlp7.onrender.com/api/wishlist",
          { product: prodId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res)
          dispatch(addFavourite(res.data.data))
      }).catch((e) => console.log(e)).finally(()=>setLoad(false))
    }
  };
  return (
    <button
      className="absolute top-1 right-1 shadow-lg bg-white p-2 text-red-600  text-2xl rounded-full"
      onClick={addToWishlistFn}
      disabled={load}
    >
      {favor ? <><IoHeart /></> : <><IoHeartOutline/></>}
    </button>
  );
}
