import axios from "axios"
import { addUser } from "../redux/userSlice"
import { getBook } from "../redux/CartSlice"



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
    // else if(localStorage.access_token){
    //     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${localStorage.access_token}`,{
    //         headers : {
    //             Authorization:`Bearer ${localStorage.access_token}`,
    //             Accept: 'application/json',
    //         }
    //     }).then((res)=>{
    //         console.log(res)
    //         dispatch(addUser(res.data))
    //     })
    // }
}
