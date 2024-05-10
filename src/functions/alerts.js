import Swal from "sweetalert2";
import { checkResponseStatus } from "./checkResponseStatus";
import { deleteFromCart } from "../redux/CartSlice";
import axios from "axios";

export const alertSuccess = ()=>{
    Swal.fire({
        title: "Successfully!",
        text: "The book add to cart!",
        icon: "success"
    });
}

export const alertError = (title)=>{
    Swal.fire({
        title,
        icon: "error"
    });
}

export const alertDeleted = (ele,myUrl,dispatch)=>{
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
}

export const fireToast = (message, status)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon:status || "success",
        title:message || "toast fired successfully"
    });
}