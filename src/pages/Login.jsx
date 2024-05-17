/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import { useForm } from "react-hook-form";
import img1 from "../assets/images/work-steps.png"
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertError } from "../functions/alerts";
import LoginWithFacebook from "../components/LoginFacebook";
import LoginGoogle from "../components/LoginGoogle";

const Login = () => {
    const myUrl = useNavigate();
    const [load,setLoad] = useState(false);
    const {register,handleSubmit,formState:{ errors }} = useForm();
    const onSubmit = (data) => {
        setLoad(true);
        axios.post("https://ecommerce-api-hlp7.onrender.com/api/auth/login", data)
        .then((res)=>{
            localStorage.token = res.data.token;
            document.cookie = "token=" + res.data.token;
            // console.log(res)
            myUrl("/")
            setLoad(false);
        }).catch(()=>{
            setLoad(false);
            alertError("Email or Password is incorrect!")
        });
    }
    return (
        <div className="flex justify-center py-5 h-[100vh]">
            <div className="container">
                <div className="flex items-center justify-center w-full gap-16 mt-5">
                    <div className="w-[500px] shadow-xl shadow-slate-400 bg-white rounded-md p-5 px-10">
                        <h2 className="text-3xl font-bold text-center">LogIn</h2>
                        <div className="flex gap-3 mt-3">
                            <div className="w-[50%] mx-auto">
                                <LoginGoogle/>
                            </div>
                            {/* <div className="w-full">
                                <LoginWithFacebook />
                            </div> */}
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-2">
                            <div className="mt-3">
                                <label htmlFor="email" className="text-lg font-bold">Email Address</label>
                                <input type="email" id="email" {...register("email", { required: true })} placeholder="You@exmaple.com" className="w-full h-10 px-2 mt-1 border-2 border-gray-400 rounded-lg outline-none" />
                                {errors.email?.type==="required" &&
                                    <p className="h-5 text-red-500 animate-bounce">Email Address is required</p>
                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="pass" className="text-lg font-bold">Password</label>
                                <input type="password" id="pass" {...register("password", { required: true })} placeholder="Enter 6 character or more" className="w-full h-10 px-2 mt-1 border-2 border-gray-400 rounded-lg outline-none" />
                                {errors.password?.type==="required" &&
                                    <p className="h-5 text-red-500 animate-bounce">Password is required</p>
                                }
                            </div>
                            <p className="text-sm capitalize font-semibold mt-2">forget password? <Link to={"/reset-password"} className="text-blue-600 underline underline-offset-2">reset</Link></p>
                            <div className="flex justify-center mt-4">
                                <button className="bg-black text-white w-[70%] h-11 rounded-md text-lg" disabled={load}>
                                    {
                                        load ? 
                                        <span className="inline-block w-5 h-5 border border-white rounded-full border-l-gray-500 animate-spin"></span>
                                        : "Login"
                                    }
                                </button>
                            </div>
                        </form>
                        <div className="mt-3 text-center text-gray-600">
                            Create a new account ? 
                            <Link to={"/register"} className="ml-1 font-bold text-black">Sign up</Link>
                        </div>
                    </div>
                    <div className="hidden md:inline-block">
                        <img src={img1} alt="library" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
