/* eslint-disable react/prop-types */
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../functions/logout"
const AccountSignOut = ({play}) => {
    const myUrl = useNavigate()
    return (
        <div style={{display:play}} className="absolute top-full mt-2 right-0 w-[200px] shadow-lg
        after:w-0 after:h-0 after:absolute after:-top-5 after:right-2 after:border-[10px] after:border-solid after:border-transparent after:border-b-red-500">
            <div className="p-2 px-3 bg-gray-200 rounded-md">
                <div>
                    <Link to={"/profile"} className="flex items-center gap-3">
                        <FaGear />
                        <span>Manage account</span>
                    </Link>
                </div>
                <button onClick={()=>logout(myUrl)} className="flex items-center w-full gap-3 mt-2">
                    <FaArrowRightFromBracket />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}

export default AccountSignOut;