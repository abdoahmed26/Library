/* eslint-disable no-unused-vars */
import axios from "axios";
import { checkResponseStatus } from "./checkResponseStatus";
import { getCart } from "../redux/CartSlice";

export const incrCart = (ele,myUrl,dispatch,setLoadInc) => {
    setLoadInc(true);
    const quant = Number(ele.quantity) + 1;
    axios.put(
        `https://ecommerce-api-hlp7.onrender.com/api/cart/${ele.product._id}`,
        { quantity: quant },
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        }
    )
    .then((res) => {
        dispatch(getCart())
    })
    .catch((e) => {
        checkResponseStatus(e, myUrl);
    }).finally(()=>setLoadInc(false));
};

export const decrCart = (ele,myUrl,dispatch,setLoadDec) => {
    setLoadDec(true);
    if(ele.quantity > 0) {
        const quant = Number(ele.quantity) - 1;
        axios.put(
            `https://ecommerce-api-hlp7.onrender.com/api/cart/${ele.product._id}`,
            { quantity: quant },
            {
                headers: {
                Authorization: `Bearer ${localStorage.token}`,
                },
        }).then((res) =>{
            dispatch(getCart())
        })
        .catch((e) => {
            checkResponseStatus(e, myUrl);
        }).finally(()=>setLoadDec(false))
    }
};