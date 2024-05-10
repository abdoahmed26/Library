/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import AccountSignOut from "./Account&SignOut";
import { useEffect, useState } from "react";
import { getUser } from "../functions/getUserandCart";

function Header() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  
  const [appear, setApp] = useState("none");

  const dispatch = useDispatch();
  
  useEffect(()=>{
    getUser(dispatch)
  },[])

  const myUrl = useNavigate()
  const goToCart = ()=>{
    myUrl("/cart")
    window.location.reload();
  }
  return (
    <header className="flex flex-col items-center justify-between gap-3 p-3 py-6 shadow-lg sm:flex-row">
      <div className="logo">
        <p className="text-4xl font-bold">
          <Link to={"/"}>Library</Link>
        </p>
      </div>
      <div className="flex items-center gap-8">
        <nav>
          <ul className="flex gap-3 font-semibold text">
            <li className="hover:underline underline-offset-4">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to={"/store"}>Store</Link>
            </li>
            <li className="hover:underline underline-offset-4">
              <Link to={"/about"}>About</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center font-semibold capitalize">
          {localStorage.token ? (
            <>
              <Link onClick={()=>goToCart()}
                className="inline-block text-[26px] mr-5 relative"
              >
                <FaCartShopping />
                <span className="absolute px-1 text-xs text-white bg-red-500 rounded-full -top-2 -right-1">
                  {cart.cartItems?.length}
                </span>
              </Link>
              <Link
                onMouseDown={() => setApp("block")}
                onMouseLeave={() => setApp("none")}
                className="relative flex flex-col justify-center text-black"
              >
                {user.profileImage?<img src={user.profileImage} className="w-9 rounded-full aspect-square inline-block m-auto"></img> :<FaUser className="text-[20px] mx-auto" />}
                <span>{user.username|| user.name  }</span>
                <AccountSignOut play={appear}/>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"} className="inline-block text-[26px] ">
                <FaSignInAlt />
              </Link>
              <Link
                to={"/register"}
                className="px-2 py-1 ml-3 text-white bg-black rounded-xl"
              >
                signUp
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
