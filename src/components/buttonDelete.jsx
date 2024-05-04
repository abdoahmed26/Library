/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { checkResponseStatus } from "../functions/checkResponseStatus";
import { deleteFromCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ButtonDelete = ({element}) => {
    const [load,setLoading] = useState(false)
    const myUrl = useNavigate();
    const dispatch = useDispatch();
    const deleCart = (ele) => {
        setLoading(true)
        axios
        .delete(`https://ecommerce-api-hlp7.onrender.com/api/cart/${ele._id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.token}`,
            },
        })
        .then(() => {
            dispatch(deleteFromCart(ele))
            setLoading(false)
        })
        .catch((e) => {
            checkResponseStatus(e, myUrl);
        });
    };
    return (
        <button disabled={load}
            onClick={() => deleCart(element)}
            className="p-2 px-3 font-bold text-white bg-black rounded-md">
            {
                load ?
                    <div className="flex justify-center">
                        <span className="inline-block border-2 border-white rounded-full w-5 h-5 border-l-gray-500 animate-spin"></span>
                    </div>
                :"Delete"
                }
        </button>
    );
}

export default ButtonDelete;
