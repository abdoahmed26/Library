import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";

const BookDetails = () => {
    const { id } = useParams()
    const [book,setBook] = useState({})
    useEffect(()=>{
        axios.get(`https://ecommerce-api-hlp7.onrender.com/api/product/${id}`)
        .then((res)=>setBook(res.data.data))
    },[id])
    const des = "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    const dispatch = useDispatch()
    const myUrl = useNavigate()
    const addCart = (ele)=>{
        axios.post("https://ecommerce-api-hlp7.onrender.com/api/cart",{productId:ele._id},{
            headers:{
                "Authorization":`Bearer ${localStorage.token}`
            }
        }).then(()=>dispatch(addToCart(ele))).catch(()=>{
            localStorage.removeItem("token");
            myUrl("/")
            window.location.reload();
        })
    }
    return (
        <div className="py-14 flex justify-center items-center">
            <div className="container">
                    {
                        book.title ? 
                        <>
                        <div className="bg-gray-200 max-w-[700px] mx-auto rounded-md flex flex-col sm:flex-row items-center">
                            <img src={book.imageCover} alt={book.title} />
                            <div className="pr-5 pl-5 pb-5 sm:p-0 sm:pr-5">
                                <div className="flex flex-col gap-3">
                                    <h1 className="font-bold text-lg">{book.title}</h1>
                                    <p className="text-gray-500 font-bold break-words">{book.description || des}</p>
                                    <p className="text-xl text-red-600 font-bold">${book.price}</p>
                                    <p className="text-yellow-400 flex items-center gap-1 text-lg font-bold">
                                        {book.ratingsAverage} <FaStar className="text-sm"/>
                                    </p>
                                    <button onClick={()=>addCart(book)} className="border-2 border-black rounded-full p-[6px] w-fit text-lg">
                                        <FaCartShopping />
                                    </button>
                                </div>
                            </div>
                        </div>
                        </>
                        :<div className="flex justify-center">
                            <span className="inline-block w-7 h-7 border-2 border-black border-l-gray-500 rounded-full animate-spin"></span>
                        </div>
                    }
            </div>
        </div>
    );
}

export default BookDetails;
