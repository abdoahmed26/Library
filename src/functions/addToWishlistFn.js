import axios from "axios";
import { addFavourite, removeFavourite } from "../redux/FavouriteSlice";

export const addToWishlistFn = (prodId,favor,dispatch,setLoad) => {
    // console.log("clicked");
    setLoad(true);
    if(favor){
        axios.delete(`https://ecommerce-api-hlp7.onrender.com/api/wishlist/${prodId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }
        ).then(()=>{
            dispatch(removeFavourite(prodId))
        }).finally(()=>setLoad(false))
    }
    else{
        axios.post("https://ecommerce-api-hlp7.onrender.com/api/wishlist",
            { product: prodId },
            {
                headers: {
                Authorization: `Bearer ${localStorage.token}`,
                },
            }
        ).then((res) => {
            // console.log(res)
            dispatch(addFavourite(res.data.data))
        }).catch((e) => console.log(e)).finally(()=>setLoad(false))
    }
};