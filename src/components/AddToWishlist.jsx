import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAddToWishlistMutation } from "../redux/productsSlice";
import axios from "axios";
import { useState } from "react";

export default function AddToWishlist({ prodId, isInWishlist }) {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const addToWishlistFn = async () => {
    console.log("clicked");
    await axios
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
        setSuccess(true)
    })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };
  return (
    <button
      className="absolute top-1 right-1 shadow-lg bg-white p-2 text-red-600  text-2xl rounded-full"
      onClick={addToWishlistFn}
      disabled={isLoading}
    >
      {isLoading ? "..." : isSuccess ? <IoHeart /> : <IoHeartOutline />}
    </button>
  );
}
