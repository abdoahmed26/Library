import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function CheckOut() {
  const { totalCartPrice, _id, totalCartpriceAfterDiscount } = useSelector(
    (state) => state.cart
  );
  // console.log(fullCart)
  const url = location
  console.log(url)

  const checkout = (id) => {
    axios.post(
      `https://ecommerce-api-hlp7.onrender.com/api/order/create-session/${id}`,
    //   `http://localhost:5000/api/order/create-session/${id}`,
     {
        successUrl: location.origin + "/order-done",
        failUrl: location.origin + "/cart"
     },
      {
        headers:{
            Authorization:`Bearer ${localStorage.token}`,
            // Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzJjN2I0ZTRkZGZkNmQzMTk0YTExZSIsImlhdCI6MTcxNTAxODk1MywiZXhwIjoxNzE1MTkxNzUzfQ.EBskF-c41nQVowT-74_OQWEwQoZKOhdPbjxxNmKL7Zg`,
        },
        
      }
    ).then(res=>{
        console.log(res)
        location.replace(res.data.data.url)
    })
     .catch(e=>console.log(e))
  };

  return (
    <div className="mx-auto w-fit">
      <div className="p-3 px-2 border border-gray-400 rounded-md">
        <form action="">
          <p className="font-bold" htmlFor="coupon">
            Have Coupon ?
          </p>
          <input
            type="text"
            className="lg:w-[170px] xl:w-fit border-2 border-black rounded-md px-1 outline-none"
            name="coupon"
            id="coupon"
          />
          <button className="px-2 py-1 ml-2 text-white bg-black rounded-md">
            apply
          </button>
        </form>
      </div>
      <div className="p-3 px-2 mt-4 border border-gray-400 rounded-md">
        <div className="pb-4 border-b-2 border-b-gray-400">
          <p className="flex justify-between font-bold">
            <span>Total Price :</span>
            <span>${totalCartPrice}</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Discount :</span>
            <span className="text-red-500">
              {totalCartPrice - totalCartpriceAfterDiscount || 0}
            </span>
          </p>
        </div>
        <div className="pt-4">
          <p className="flex justify-between font-bold">
            <span>Total Price After Discount:</span>
            <span>${totalCartpriceAfterDiscount || totalCartPrice}</span>
          </p>
          <div className="flex flex-col gap-3 mt-5">
            <button
              className="bg-black p-2 w-[60%] text-center text-white font-bold rounded-md mx-auto"
              onClick={()=>checkout(_id)}
            >
              Purchase
            </button>
            <Link
              to={"/store"}
              className="bg-white p-1 w-[60%] text-center text-black border-2 border-black font-bold rounded-md mx-auto"
            >
              Back To Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
