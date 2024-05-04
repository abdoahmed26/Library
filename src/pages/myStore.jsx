/* eslint-disable no-unused-vars */
import { FaSearch, FaStar } from "react-icons/fa";
import { useGetProductsQuery } from "../redux/productsSlice";
import defaultImage from "../assets/images/DfImage.png";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { addToCart } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const MyStore = () => {
    const myUrl = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const {data, error, isLoading} = useGetProductsQuery()
    const [search,setSearch] = useState("");
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    console.log(data)
    console.log(cart)
    console.log("paarms",)
    const addCart = (ele)=>{
        console.log(localStorage.token)
        axios.post(`https://ecommerce-api-hlp7.onrender.com/api/cart`,{productId:ele._id},{
            headers:{
                "Authorization":`Bearer ${localStorage.token}`
            }
        }).then(()=>dispatch(addToCart(ele))).catch((e)=>{
            // localStorage.removeItem("token");
            // myUrl("/")
            // window.location.reload();
            console.log(e)
            if(e.response.status === 403) myUrl("/forbidden")
        })
    }
    return (
        <div className="py-10 flex justify-center">
            <div className="container">
                <div className="flex justify-center">
                    <div className="p-2 border-2 border-gray-400 flex items-center justify-between w-[300px] rounded">
                        <input type="text" placeholder="What your looking for ?" 
                        className="placeholder:text-gray-500 placeholder:font-bold w-full outline-none" onChange={(e)=>setSearch(e.target.value)}/>
                        <span className="text-gray-500"><FaSearch/></span>
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    {
                        isLoading ? 
                        <div className="flex justify-center">
                            <span className="inline-block w-7 h-7 border-2 border-black border-l-gray-500 rounded-full animate-spin"></span>
                        </div>
                        :<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                            {
                                data.data.map((ele)=>{
                                    return ele.title.toLowerCase().includes(search.toLowerCase()) ? 
                                        <div key={ele._id} className="text-center bg-gray-100 shadow-lg rounded-md pb-2">
                                            <Link to={`/bookDetails/${ele._id}`}>
                                                <img src={ ele.imageCover || defaultImage} alt={ele.title} className="w-full rounded-t-md"/>
                                            </Link>
                                            <div className="px-3">
                                                <h1 className="font-bold text-lg">{ele.title.slice(0,10)}...</h1>
                                                <p className="text-yellow-400 flex justify-center items-center gap-1 text-lg font-bold">
                                                    {ele.ratingsAverage} <FaStar className="text-sm"/>
                                                </p>
                                                {/* <p className="text-gray-500 font-bold text-sm my-2 break-words">{ele.description.slice(0,80)}</p> */}
                                                <div className="flex justify-between items-center px-2">
                                                    <p className="text-red-500 font-bold">${ele.price}</p>
                                                    <button onClick={()=>addCart(ele)} className="border-2 border-black rounded-full p-[4px] w-fit"><FaCartShopping/></button>
                                                </div>
                                            </div>
                                        </div>
                                    : null;
                                }
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MyStore;