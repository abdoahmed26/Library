import { FaStar } from "react-icons/fa";
import defaultImage from "../assets/images/DfImage.png";
import AddToWishlist from "../components/AddToWishlist";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProductCard({ele}) {
    const cart = useSelector(state=>state.cart)
    const [isInCart, setInCart] = useState(false);

    useEffect(()=>{
        setInCart(cart.cartItems?.some(
            (e) => e.product === ele._id
          ))
        //   console.log(cart)
    },[cart])
  return (
    <div
    key={ele._id}
    className=" relative pb-2 text-center bg-gray-100 rounded-md shadow-lg"
  >
    <AddToWishlist prodId={ele._id}/>
    <Link to={`/bookDetails/${ele._id}`}>
      <img
        src={ele.imageCover || defaultImage}
        alt={ele.title}
        className="w-full rounded-t-md"
      />
    </Link>
    <div className="px-3">
      <h1 className="text-lg font-bold">
        {ele.title.slice(0, 10)}...
      </h1>
      <p className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
        {ele.ratingsAverage.toFixed(1)}{" "}
        <FaStar className="text-sm" />
      </p>
      {/* <p className="my-2 text-sm font-bold text-gray-500 break-words">{ele.description.slice(0,80)}</p> */}
      <div className="flex items-center justify-between px-2">
        <p className="font-bold text-red-500">${ele.price}</p>
        <AddToCart
          ele={ele}
          isInCart={isInCart}
        />
      </div>
    </div>
  </div>
  )
}
