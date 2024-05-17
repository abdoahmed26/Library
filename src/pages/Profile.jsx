/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { alertError } from "../functions/alerts";
import UpdatePassword from "../components/UpdatePassword";
import Spinner from "../components/Spinner";
import userDefaultImg from "../assets/images/default-user-image.jpg";
const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  // console.log(user)
  const [img, setImg] = useState(null);
  const onSubmit = (data) => {
    setLoad(true);
    console.log(img);
    const firstData = {
      username: data.name || undefined,
      email: data.email === user.email ? undefined : data.email || undefined,
      phone: data.phone || undefined,
      profileImage: img|| undefined,
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
      })
      .catch(() => alertError("something wrong"))
      .finally(() => {
        // window.location.reload();
      });
  };
  return (
    <div className="flex justify-center items-center py-10">
      <div className="container">
        {user.email ? (
          <div className="">
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

                    <div className="flex justify-center my-3">
                      <img
                        src={
                          img
                            ? URL.createObjectURL(img)
                            : user?.profileImage || userDefaultImg
                        }
                        className="w-32 rounded-full aspect-square inline-block m-auto"
                      ></img>
                    </div>

                    <div className="flex justify-center pb-2">
                      <label
                        htmlFor="file"
                        className="p-2 px-3 font-bold text-white bg-black rounded-md cursor-pointer"
                      >
                        Choose a file
                      </label>
                      <input
                        type="file"
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
                    <h1 className="mb-4 text-2xl font-bold">
                      Account Information
                    </h1>
                    <div className="sm:w-[360px] flex flex-col sm:flex-row  sm:justify-between mb-3">
                      <label htmlFor="name" className="text-lg font-bold">
                        Username
                      </label>
                      <div className="w-full sm:w-[250px]">
                        <input
                          type="text"
                          {...register("name", {
                            minLength:
                              user.username?.length || user.name?.length,
                          })}
                          defaultValue={user.username || user.name}
                          id="name"
                          className="w-full px-1 border-2 border-gray-400 outline-none"
                        />
                        {errors.name?.type === "minLength" && (
                          <p className="h-5 mb-2 text-sm text-red-500 whitespace-break-spaces animate-bounce">
                            Username must be equal to or more than{" "}
                            {user.username?.length || user.name?.length}
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
                          {...register("phone", {
                            minLength: user.phone?.length,
                          })}
                          defaultValue={user.phone}
                          id="phone"
                          className="w-full px-1 border-2 border-gray-400 outline-none"
                        />
                        {errors.phone?.type === "minLength" && (
                          <p className="h-5 text-sm text-red-500 break-words animate-bounce">
                            Phone must be equal to or more than{" "}
                            {user.phone?.length}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div>
                      
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
            <div className="w-full flex justify-center">
              <UpdatePassword />
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Profile;
