import { useForm } from "react-hook-form";
import img1 from "./images/work-steps.png"
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const myUrl = useNavigate();
    const [load,setLoad] = useState(false);
    const {register,handleSubmit,formState:{ errors }} = useForm();
    const onSubmit = (data) => {
        setLoad(true);
        console.log(data)
        axios.post("https://library-api-u8cm.onrender.com/api/v1/auth/register", data)
        .then(()=>{
            // go to login
            myUrl("/login");
            setLoad(false);
        }).catch(()=>{
            setLoad(false);
            alert("Email already exists")
        })
    }
    return (
        <div className="flex justify-center py-5">
            <div className="container">
                <h1 className="text-4xl font-bold">Library</h1>
                <div className="flex items-center justify-center w-full gap-16 mt-5">
                    <div className="w-[500px] shadow-xl shadow-slate-400 bg-white rounded-md p-5 px-10">
                        <h2 className="text-3xl font-bold text-center">Sign up</h2>
                        <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-2">
                            <div>
                                <label htmlFor="user" className="text-lg font-bold">Username</label>
                                <input type="text" id="user" {...register("name", { required: "Username is required", minLength:2, maxLength: 100 })} placeholder="Type your name In the website" className="w-full h-10 px-2 mt-1 border-2 border-gray-400 rounded-lg outline-none" />
                                {errors.name?.message &&
                                    <p className="h-5 text-red-500 animate-bounce">Username is required</p>
                                }
                                {errors.name?.type==="minLength" &&
                                    <p className="h-5 text-red-500 animate-bounce">Username must be more than 2 character</p>
                                }
                                {errors.name?.type==="maxLength" &&
                                    <p className="h-5 text-red-500 animate-bounce">Username must be less than 100 character</p>
                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="email" className="text-lg font-bold">Email Address</label>
                                <input type="email" id="email" {...register("email", { required: true })} placeholder="You@exmaple.com" className="w-full h-10 px-2 mt-1 border-2 border-gray-400 rounded-lg outline-none" />
                                {errors.email?.type==="required" &&
                                    <p className="h-5 text-red-500 animate-bounce">Email Address is required</p>
                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="pass" className="text-lg font-bold">Password</label>
                                <input type="password" id="pass" {...register("password", { required: true, minLength:6, maxLength: 32 })} placeholder="Enter 6 character or more" className="w-full h-10 px-2 mt-1 border-2 border-gray-400 rounded-lg outline-none" />
                                {errors.password?.type==="required" &&
                                    <p className="h-5 text-red-500 animate-bounce">Password is required</p>
                                }
                                {errors.password?.type==="minLength" &&
                                    <p className="h-5 text-red-500 animate-bounce">Password must be more than 6 character</p>
                                }
                                {errors.password?.type==="maxLength" &&
                                    <p className="h-5 text-red-500 animate-bounce">Password must be less than 32 character</p>
                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="phone" className="text-lg font-bold">Phone Number</label>
                                <input type="tel" id="phone" {...register("phone", { required: true })} placeholder="+2" className="w-full h-10 px-2 mt-1 border-2 border-gray-400 rounded-lg outline-none" />
                                {errors.phone?.type==="required" &&
                                    <p className="h-5 text-red-500 animate-bounce">Phone is required</p>
                                }
                            </div>
                            <div className="flex justify-center mt-6">
                                <button className="bg-black text-white w-[70%] h-11 rounded-md text-lg" disabled={load}>
                                    {
                                        load ? 
                                        <span className="inline-block w-5 h-5 border border-white rounded-full border-l-gray-500 animate-spin"></span>
                                        : "Register"
                                    }
                                </button>
                            </div>
                        </form>
                        <div className="mt-3 text-center text-gray-600">
                            You have an account ? 
                            <Link to={"/login"} className="ml-1 font-bold text-black">Login now</Link>
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

export default Register;
