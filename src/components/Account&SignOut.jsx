/* eslint-disable react/prop-types */
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../functions/logout"
import { useDispatch, useSelector } from "react-redux";
import { IoHeart } from "react-icons/io5";
const AccountSignOut = ({appear}) => {
    const myUrl = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    return (
        <div style={{display:`${appear?"block":"none"}`}} className="absolute top-full right-0 mt-2 w-[200px] shadow-lg
        after:w-0 after:h-0 after:absolute after:-top-5 after:right-2 after:border-[10px] after:border-solid after:border-transparent after:border-b-red-500">
            <div className="p-2 px-3 bg-gray-200 rounded-md">
                {user.role !== "admin" && 
                    <div>
                        <Link to={"/wishlist"} className="flex items-center gap-3">
                            <IoHeart />
                            <span>Wishlist</span>
                        </Link>
                    </div>
                }
                <div>
                    <Link to={"/profile"} className="flex items-center gap-3">
                        <FaGear />
                        <span>Manage account</span>
                    </Link>
                </div>
                <button onClick={()=>logout(myUrl,dispatch)} className="flex items-center w-full gap-3 mt-2">
                    <FaArrowRightFromBracket />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}

export default AccountSignOut;