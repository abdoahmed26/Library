/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { checkResponseStatus } from "../functions/checkResponseStatus";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../redux/CartSlice";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";

export default function AddToCart({ ele, isInCart }) {
  const myUrl = useNavigate();
  const dispatch = useDispatch();
  const addCart = (ele) => {
    axios
      .post(
        `https://ecommerce-api-hlp7.onrender.com/api/cart`,
        { productId: ele._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((res) => dispatch(getBook(res.data)))
      .catch((e) => {
        checkResponseStatus(e, myUrl);
      });
  };
  return isInCart ? (
    <button onClick={() => addCart(ele)} className="text-2xl text-red-900">
      <FaCartArrowDown />
    </button>
  ) : (
    <button onClick={() => addCart(ele)} className="text-2xl text-green-900">
      <FaCartPlus /> 
    </button>
  );
}
