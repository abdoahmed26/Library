import axios from "axios";
import { getBook } from "../redux/CartSlice";
import { alertSuccess } from "./alerts";
import { checkResponseStatus } from "./checkResponseStatus";

export const addCart = (ele,myUrl,dispatch,setLoading) => {
    axios.post(
        `https://ecommerce-api-hlp7.onrender.com/api/cart`,
        // "http://localhost:5000/api/cart",
        { productId: ele._id },
        {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzJjN2I0ZTRkZGZkNmQzMTk0YTExZSIsImlhdCI6MTcxNTAxODk1MywiZXhwIjoxNzE1MTkxNzUzfQ.EBskF-c41nQVowT-74_OQWEwQoZKOhdPbjxxNmKL7Zg`,
            },
        }
    ).then((res) => {
        dispatch(getBook(res.data));
        alertSuccess()
        setLoading(false);
    }).catch((e) => {
        checkResponseStatus(e, myUrl);
        setLoading(false);
    });
};