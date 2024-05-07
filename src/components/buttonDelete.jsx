/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { checkResponseStatus } from "../functions/checkResponseStatus";
import { deleteFromCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ButtonDelete = ({element}) => {
    const [load,setLoading] = useState(false)
    const myUrl = useNavigate();
    const dispatch = useDispatch();
    const deleCart = (ele) => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://ecommerce-api-hlp7.onrender.com/api/cart/${ele._id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    },
                })
                .then(() => {
                    dispatch(deleteFromCart(ele))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Book has been deleted.",
                        icon: "success"
                    });
                })
                .catch((e) => {
                    checkResponseStatus(e, myUrl);
                });
            }
        });
        setLoading(false)
    };
    return (
        <button disabled={load}
            onClick={() => deleCart(element)}
            className="p-2 px-3 font-bold text-white bg-black rounded-md">
            {
                load ?
                    <div className="flex justify-center">
                        <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                    </div>
                :"Delete"
                }
        </button>
    );
}

export default ButtonDelete;
