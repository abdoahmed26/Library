/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertDeleted } from "../functions/alerts";

const ButtonDelete = ({element}) => {
    const [load,setLoading] = useState(false)
    const myUrl = useNavigate();
    const dispatch = useDispatch();
    const deleCart = (ele) => {
        setLoading(true)
        alertDeleted(ele, myUrl,dispatch)
        setLoading(false)
    };
    return (
        <button disabled={load}
            onClick={() => deleCart(element)}
            className="p-2 px-3 font-bold text-white bg-black rounded-md">
            {
                load ?
                    <div className="flex justify-center">
                        <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                    </div>
                :"Delete"
            }
        </button>
    );
}

export default ButtonDelete;
