/* eslint-disable react/prop-types */
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AccountSignOut = ({play}) => {
    const signOut = ()=>{
        localStorage.removeItem("token");
        window.location.reload()
    }
    return (
        <div style={{display:play}} className="absolute top-full mt-2 right-2 w-[200px] shadow-lg
        after:w-0 after:h-0 after:absolute after:-top-5 after:right-1 after:border-[10px] after:border-solid after:border-transparent after:border-b-red-500">
            <div className="bg-gray-200 p-2 px-3 rounded-md">
                <div>
                    <Link to={"/profile"} className="flex items-center gap-3">
                        <FaGear />
                        <span>Manage account</span>
                    </Link>
                </div>
                <button onClick={()=>signOut()} className="flex items-center gap-3 mt-2 w-full">
                    <FaArrowRightFromBracket />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}

export default AccountSignOut;