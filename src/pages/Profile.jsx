/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { alertError, alertSuccess, fireToast } from "../functions/alerts";
import { addUser } from "../redux/userSlice";
import UpdatePassword from "../components/UpdatePassword";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [img, setImg] = useState(null);
  //   console.log(img);
  const user = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch()
  // console.log(user)
  const onSubmit = (data) => {
    setLoad(true);
    console.log(data)
    const firstData = {
      username: data.username || undefined,
      name: data.name || undefined,
      email: data.email === user.email ? undefined : data.email || undefined,
      phone: data.phone || undefined,
      profileImage: data.profileImage[0] || undefined,
    };
    axios
      .put(
        "https://ecommerce-api-hlp7.onrender.com/api/user/updateMe",
        firstData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(addUser(res.data))
        // alertSuccess("user updated successfully")
        fireToast("user updated successfully")
      })
      .catch(() => alertError("something wrong"))
      .finally(() => {
        // window.location.reload()
      })
      .finally(() => setLoad(false));
    // console.log(data)
    console.log(firstData);
    // const changes = {
    //     password : data.password,
    //     newPassword : data.newPassword,
    //     repeatPassword : data.repeatPassword,
    // }
  };

  return (
    <div className="flex justify-center py-7">
      <div className="container">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center"
        >
          <div className="flex flex-col w-full gap-6 border border-gray-400 rounded-md sm:pr-5 sm:flex-row sm:w-fit">
            <div className="p-3 px-5 bg-gray-200 border border-gray-400 rounded-md">
              <h1 className="mb-4 text-2xl font-bold">Edit Your Profile</h1>
              <div>
                <h1 className="text-xl font-bold">Photo:</h1>
                <p className="flex justify-center my-6 text-[120px]">
                  {img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      alt="user image"
                      className=" rounded-full w-48 aspect-square"
                    ></img>
                  ) : user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="user image"
                      className=" rounded-full w-48 aspect-square"
                    ></img>
                  ) : (
                    <FaUser />
                  )}
                </p>
                <div className="flex justify-center pb-2">
                  <label
                    htmlFor="file"
                    className="p-2 px-3 font-bold text-white bg-black rounded-md cursor-pointer"
                  >
                    Choose a file
                  </label>
                  <input
                    type="file"
                    {...register("profileImage")}
                    onChange={(e) => setImg(e.target.files[0])}
                    defaultValue=""
                    name="profileImage"
                    id="file"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-5 px-5 py-3 sm:px-0">
              <div>
                <h1 className="mb-4 text-2xl font-bold">Account Information</h1>
                <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                  <label htmlFor="name" className="text-lg font-bold">
                    Name
                  </label>
                  <div className="w-full sm:w-[250px]">
                    <input
                      type="text"
                      {...register("name", { minLength: user.name?.length })}
                      defaultValue={user.name}
                      id="name"
                      className="w-full px-1 border-2 border-gray-400 outline-none"
                    />
                    {errors.name?.type === "minLength" && (
                      <p className="h-5 mb-2 text-sm text-red-500 whitespace-break-spaces animate-bounce">
                        Username must be equal to or more than{" "}
                        {user.name?.length}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                  <label htmlFor="name" className="text-lg font-bold">
                    Username
                  </label>
                  <div className="w-full sm:w-[250px]">
                    <input
                      type="text"
                      {...register("username", {
                        minLength: user.username?.length,
                      })}
                      defaultValue={user.username}
                      id="username"
                      className="w-full px-1 border-2 border-gray-400 outline-none"
                    />
                    {errors.username?.type === "minLength" && (
                      <p className="h-5 mb-2 text-sm text-red-500 whitespace-break-spaces animate-bounce">
                        Username must be equal to or more than{" "}
                        {user.username?.length}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                  <label htmlFor="email" className="text-lg font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    defaultValue={user.email}
                    id="email"
                    className="w-full px-1 border-2 border-gray-400 outline-none sm:w-[250px] "
                  />
                </div>
                <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between">
                  <label htmlFor="phone" className="text-lg font-bold">
                    Phone
                  </label>
                  <div className="w-full sm:w-[250px]">
                    <input
                      type="text"
                      {...register("phone", { minLength: user.phone?.length })}
                      defaultValue={user.phone}
                      id="phone"
                      className="w-full px-1 border-2 border-gray-400 outline-none"
                    />
                    {errors.phone?.type === "minLength" && (
                      <p className="h-5 text-sm text-red-500 break-words animate-bounce">
                        Phone must be equal to or more than {user.phone?.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="mt-3">
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
                            </div> */}
              <div className="flex items-center justify-end">
                <div>
                  <button
                    type="reset"
                    className="p-1 px-4 mr-4 font-bold text-black bg-white border-2 border-black rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={load}
                    className="p-1 px-4 font-bold text-white bg-black border-2 border-black rounded"
                  >
                    {load ? (
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-4 h-4 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                        Saving
                      </div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
            <UpdatePassword/>
      </div>
    </div>
  );
};

export default Profile;
