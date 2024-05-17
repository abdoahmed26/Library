/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UpdateDeleteProduct = ({ele}) => {
    const [load,setload] = useState(false)
    const myUrl=useNavigate();
    const deleteProduct = (id)=>{
        setload(true)
        axios.delete(`https://ecommerce-api-hlp7.onrender.com/api/product/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(()=>{
            myUrl("/store")
            window.location.reload()
        })
    }
    return (
        <div className="flex items-center gap-2">
            <button onClick={()=>myUrl(`/UpdateProduct/${ele._id}`)} className="flex items-center gap-2 bg-blue-500 text-white py-1 px-2 rounded-md">
                <FaPen />Update
            </button>
            <button onClick={()=>deleteProduct(ele._id)} disabled={load}
            className="flex items-center gap-2 bg-red-500 text-white py-1 px-2 rounded-md">
                {
                    load?
                        <div className="flex justify-center">
                            <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                        </div>
                    :<><FaTrashCan />Delete</>
                }
            </button>
        </div>
    );
}

export default UpdateDeleteProduct;
