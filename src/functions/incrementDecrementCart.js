import axios from "axios";
import { checkResponseStatus } from "./checkResponseStatus";
import { decrement, increment } from "../redux/CartSlice";

export const incrCart = (ele,myUrl,dispatch,setLoadInc) => {
    setLoadInc(true);
    const quant = Number(ele.quantity) + 1;
    axios.put(
        `https://ecommerce-api-hlp7.onrender.com/api/cart/${ele.product._id}`,
        // `http://localhost:5000/api/cart/${ele.product._id}`,
        { quantity: quant },
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzJjN2I0ZTRkZGZkNmQzMTk0YTExZSIsImlhdCI6MTcxNTAxODk1MywiZXhwIjoxNzE1MTkxNzUzfQ.EBskF-c41nQVowT-74_OQWEwQoZKOhdPbjxxNmKL7Zg`,
            },
        }
    )
    .then(() => dispatch(increment(ele)))
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
        }).then(() => dispatch(decrement(ele)))
        .catch((e) => {
            checkResponseStatus(e, myUrl);
        }).finally(()=>setLoadDec(false))
    }
};