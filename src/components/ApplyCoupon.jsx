/* eslint-disable react/prop-types */
import { useState } from "react";
import { fireToast } from "../functions/alerts";
import axios from "axios";
import Spinner from "./Spinner"
import { useSelector } from "react-redux";
export default function ApplyCoupon({ cartId }) {
  const [coupon, setCoupon] = useState("");
  const [isLoading, setLoading] = useState(false);
  const cart = useSelector(state=>state.cart);
  // console.log(cart)
  const applyCoupon = (e) => {
    e.preventDefault();
    if (!coupon) {
      fireToast("enter coupon ", "info");
      return;
    }
    setLoading(true);

    axios
      .post(
        `https://ecommerce-api-hlp7.onrender.com/api/cart/${cartId}/applyCoupon`,
        { coupon },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        fireToast("coupon added")
        location.reload()
      })
      .catch((e) => {
        console.log(e);
        const msg = e?.response?.data?.message || "something went wrong"
        fireToast(msg,"error")
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-3 px-2 border border-gray-400 rounded-md">
      <form onSubmit={applyCoupon}>
        <p className="font-bold" htmlFor="coupon">
          Have Coupon ?
        </p>
        {cart?.coupon && <p>{cart.coupon.name}</p>}
        <input
          type="text"
          className="lg:w-[170px] xl:w-fit border-2 border-black rounded-md px-1 outline-none"
          name="coupon"
          id="coupon"
          onChange={(e) => setCoupon(e.target.value)}
          value={coupon}
        />
        <button disabled={isLoading} className="px-2 py-1 ml-2 text-white bg-black rounded-md">
          {isLoading?<Spinner/>:"apply"}
        </button>
      </form>
    </div>
  );
}
