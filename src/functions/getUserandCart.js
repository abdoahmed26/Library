import axios from "axios"
import { addUser } from "../redux/userSlice"
import { getCart } from "../redux/CartSlice"
import { addFavourite } from "../redux/FavouriteSlice"


export const getUser = (dispatch)=>{
    if(localStorage.token){
        axios.get("https://ecommerce-api-hlp7.onrender.com/api/user/getMe",{
            headers : {
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then((res)=>{
            dispatch(addUser(res.data.data))
        }).catch(()=>localStorage.removeItem("token"))
        dispatch(getCart())
        axios.get("https://ecommerce-api-hlp7.onrender.com/api/wishlist",{
            headers : {
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then((res)=>{
            dispatch(addFavourite(res.data.data))
        })
    }
}
