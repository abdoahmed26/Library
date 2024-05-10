/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";


const UpdateDeleteComment = ({comment,setComment}) => {
    const [load,setLoad] = useState(false);
    const deleteComment = (ele)=>{
        setLoad(true);
        axios.delete(`https://ecommerce-api-hlp7.onrender.com/api/review/${ele._id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(res=>console.log(res)).finally(()=>window.location.reload())
    }
    const update = (ele)=>{
        setComment({...ele})
    }
    return (
        <div>
            <div className="flex gap-3">
                <button onClick={()=>update(comment)}
                className="bg-blue-500 text-white p-1 px-2 rounded">Update</button>
                <button onClick={()=>deleteComment(comment)} disabled={load}
                className="bg-red-500 text-white p-1 px-2 rounded">
                    {
                        load?
                            <div className="flex justify-center">
                                <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                            </div>
                        :"Delete"
                    }
                </button>
            </div>
        </div>
    );
}

export default UpdateDeleteComment;
