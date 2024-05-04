/* eslint-disable no-unused-vars */
import { FaSearch, FaStar } from "react-icons/fa";
import { useGetProductsQuery } from "../redux/productsSlice";
import defaultImage from "../assets/images/DfImage.png";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { getBook } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyStore = () => {
    const myUrl = useNavigate()
    const {data, error, isLoading} = useGetProductsQuery()
    const [search,setSearch] = useState("");
    const dispatch = useDispatch()
    const addCart = (ele)=>{
        axios.post(`https://ecommerce-api-hlp7.onrender.com/api/cart`,{productId:ele._id},{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then((res)=>dispatch(getBook(res.data.cartItems))).catch((e)=>{
            // localStorage.removeItem("token");
            // myUrl("/")
            // window.location.reload();
            console.log(e)
            if(e.response.status === 403) myUrl("/forbidden")
        })
    }
    return (
        <div className="flex justify-center py-10">
            <div className="container">
                <div className="flex justify-center">
                    <div className="p-2 border-2 border-gray-400 flex items-center justify-between w-[300px] rounded">
                        <input type="text" placeholder="What your looking for ?" 
                        className="w-full outline-none placeholder:text-gray-500 placeholder:font-bold" onChange={(e)=>setSearch(e.target.value)}/>
                        <span className="text-gray-500"><FaSearch/></span>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    {
                        isLoading ? 
                        <div className="flex justify-center">
                            <span className="inline-block border-2 border-black rounded-full w-7 h-7 border-l-gray-500 animate-spin"></span>
                        </div>
                        :<div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                            {
                                data.data.map((ele)=>{
                                    return ele.title.toLowerCase().includes(search.toLowerCase()) ? 
                                        <div key={ele._id} className="pb-2 text-center bg-gray-100 rounded-md shadow-lg">
                                            <Link to={`/bookDetails/${ele._id}`}>
                                                <img src={ ele.imageCover || defaultImage} alt={ele.title} className="w-full rounded-t-md"/>
                                            </Link>
                                            <div className="px-3">
                                                <h1 className="text-lg font-bold">{ele.title.slice(0,10)}...</h1>
                                                <p className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
                                                    {ele.ratingsAverage} <FaStar className="text-sm"/>
                                                </p>
                                                {/* <p className="my-2 text-sm font-bold text-gray-500 break-words">{ele.description.slice(0,80)}</p> */}
                                                <div className="flex items-center justify-between px-2">
                                                    <p className="font-bold text-red-500">${ele.price}</p>
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