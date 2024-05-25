/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import verified from "../assets/images/verified.gif"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sendEmail } from "../functions/sendEmail";

export default function OrderDone() {
  const user = useSelector((state) => state.user);
  useEffect(()=>{
    sendEmail(user)
  },[user?.email])
  return (
    <div className='flex items-center justify-center py-10'>
      <div className="container">
        <div className='flex flex-col items-center justify-center px-5 mt-4'>
          <img src={verified}
            alt='check'
            width={130}
            height={130}
            className="rounded-full"
          />
          <h2 className='text-[24px]'>Payment Successful !</h2>
          <h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
            order confirmation
            along with Digital Content</h2>
          <Link to={"/"} className='p-2 px-3 mt-6 text-white bg-blue-600 rounded-md'>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
