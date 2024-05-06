/* eslint-disable no-unused-vars */
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
    const {register,handleSubmit,formState:{ errors }} = useForm();
    const user = useSelector((state) => state.user);
    // console.log(user)
    const onSubmit = (data) => {
        const firstData = {
            name: data.name || user.name,
            email: data.email || user.email,
            phone: data.phone || user.phone,
            profileImage: data.profileImage[0]?.name || "",
        }
        // axios.put("https://ecommerce-api-hlp7.onrender.com/api/user/updateMe",firstData,{
        //     headers : {
        //         Authorization : `Bearer ${localStorage.token}`
        //     }
        // }).then((res)=>console.log(res));
        // console.log(data)
        console.log(firstData)
        const changes = {
            password : data.password,
            newPassword : data.newPassword,
            repeatPassword : data.repeatPassword,
        }
    }
    return (
        <div className="flex justify-center py-7">
            <div className="container">
                <form action="" onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
                    <div className="flex flex-col w-full gap-6 border border-gray-400 rounded-md sm:pr-5 sm:flex-row sm:w-fit">
                        <div className="p-3 px-5 bg-gray-200 border border-gray-400 rounded-md">
                            <h1 className="mb-4 text-2xl font-bold">Edit Your Profile</h1>
                            <div>
                                <h1 className="text-xl font-bold">Photo:</h1>
                                <p className="flex justify-center my-6 text-[120px]"><FaUser/></p>
                                <div className="flex justify-center pb-2">
                                    <label htmlFor="file" className="p-2 px-3 font-bold text-white bg-black rounded-md cursor-pointer">
                                        Choose a file
                                    </label>
                                    <input type="file" {...register("profileImage")} defaultValue="" name="profileImage" id="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-3 sm:px-0">
                            <div>
                                <h1 className="mb-4 text-2xl font-bold">Account Information</h1>
                                    <div className="sm:w-[290px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                        <label htmlFor="name" className="text-lg font-bold">Username</label>
                                        <input type="text" {...register("name")} defaultValue={user.name} id="name" className="px-1 border-2 border-gray-400 outline-none "/>
                                    </div>
                                    <div className="sm:w-[290px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                        <label htmlFor="email" className="text-lg font-bold">Email</label>
                                        <input type="email" {...register("email")} defaultValue={user.email} id="email" className="px-1 border-2 border-gray-400 outline-none "/>
                                    </div>
                                    <div className="sm:w-[290px] flex flex-col sm:flex-row  sm:justify-between">
                                        <label htmlFor="phone" className="text-lg font-bold">Phone</label>
                                        <input type="text" {...register("phone")} defaultValue={user.phone} id="phone" className="px-1 border-2 border-gray-400 outline-none "/>
                                    </div>
                            </div>
                            <div className="mt-3">
                                <h1 className="mb-4 text-2xl font-bold">Change Your Password</h1>
                                    <div className="sm:w-[355px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                        <label htmlFor="current" className="text-lg font-bold">Current Password</label>
                                        <input type="password" {...register("password",{ required: true })} id="current" className="px-1 border-2 border-gray-400 outline-none"/>
                                    </div>
                                    <div className="sm:w-[355px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                        <label htmlFor="new" className="text-lg font-bold">New Password</label>
                                        <input type="password" {...register("newPassword",{ required: true })} id="new" className="px-1 border-2 border-gray-400 outline-none "/>
                                    </div>
                                    <div className="sm:w-[355px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                                        <label htmlFor="repeat" className="text-lg font-bold">Repeat Password</label>
                                        <input type="password" {...register("repeatPassword",{ required: true })} id="repeat" className="px-1 border-2 border-gray-400 outline-none "/>
                                    </div>
                            </div>
                            <div className="flex justify-end">
                                <div>
                                    <button type="reset" className="p-1 px-4 mr-4 font-bold text-black bg-white border-2 border-black rounded-md cursor-pointer">
                                        Cancel
                                    </button>
                                    <button type="submit" className="p-1 px-4 font-bold text-white bg-black border-2 border-black rounded">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
