/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { checkResponseStatus } from "../functions/checkResponseStatus";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../redux/CartSlice";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddToCart({ ele, isInCart }) {
  const [isLoading, setLoading] = useState(false);
  const myUrl = useNavigate();
  const dispatch = useDispatch();
  const addCart = (ele) => {
    axios
      .post(
        `https://ecommerce-api-hlp7.onrender.com/api/cart`,
        // "http://localhost:5000/api/cart",
        { productId: ele._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzJjN2I0ZTRkZGZkNmQzMTk0YTExZSIsImlhdCI6MTcxNTAxODk1MywiZXhwIjoxNzE1MTkxNzUzfQ.EBskF-c41nQVowT-74_OQWEwQoZKOhdPbjxxNmKL7Zg`,
          },
        }
      )
      .then((res) => {
        dispatch(getBook(res.data));
        Swal.fire({
          title: "Successfully!",
          text: "The book add to cart!",
          icon: "success"
        });
        setLoading(false);
      })
      .catch((e) => {
        checkResponseStatus(e, myUrl);
        setLoading(false);
      });
  };
//   console.log(isLoading);
  return isInCart ? (
    <button onClick={() => addCart(ele)} className="text-2xl text-red-900">
      {isLoading ? "loading" : <FaCartArrowDown />}
    </button>
  ) : (
    <button onClick={() => addCart(ele)} className="text-2xl text-green-900">
      <FaCartPlus />
    </button>
  );
}
