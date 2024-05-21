/* eslint-disable no-unused-vars */
import axios from "axios";
import { getCart } from "../redux/CartSlice";
import { alertSuccess } from "./alerts";
import { checkResponseStatus } from "./checkResponseStatus";

export const addCart = (ele,myUrl,dispatch,setLoading) => {
    axios.post(
        `https://ecommerce-api-hlp7.onrender.com/api/cart`,
        { productId: ele._id },
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        }
    ).then((res) => {
        dispatch(getCart());
        alertSuccess()
        setLoading(false);
    }).catch((e) => {
        checkResponseStatus(e, myUrl);
        setLoading(false);
    });
};