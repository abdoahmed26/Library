import axios from "axios"
import { addUser } from "../redux/userSlice"
import { getBook } from "../redux/CartSlice"
import {checkResponseStatus} from "../functions/checkResponseStatus"


export const getUser = (dispatch)=>{
    if(localStorage.token){
        axios.get("https://ecommerce-api-hlp7.onrender.com/api/user/getMe",{
            headers : {
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then((res)=>{
            dispatch(addUser(res.data.data))
        })
        axios.get("https://ecommerce-api-hlp7.onrender.com/api/cart",{
            headers : {
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then((res)=>{
            dispatch(getBook(res.data.data))
        })
    }
}
