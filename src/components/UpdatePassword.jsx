import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fireToast } from "../functions/alerts";
export default function UpdatePassword() {
  const { _id } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [formError, setError] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  console.log(_id, data);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    if (data?.oldPassword?.length < 6) {
      setError("old password minLen is 6");
      return;
    }
    if (data.password?.length < 6 || data.password?.length > 20) {
      setError("new password minLen is 6 and maxLen is 20");
      return;
    }
    if (data.password !== data.passwordComfirmation) {
      setError("new password and confirm password are not the same");
      return;
    }

    axios
      .put(
        "https://ecommerce-api-hlp7.onrender.com/api/user/updateMyPassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        fireToast("password updated successfully");
        localStorage.token = res.data.token;
        setData({})
      })
      .catch((err) => {
        console.log(err);
        fireToast("something went wrong while updating password", "error");
      })
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 p-3 flex-col w-full gap-6 border border-gray-400 rounded-md sm:pr-5 sm:flex-row sm:w-fit"
    >
      {formError ? (
        <p className="text-xs font-semibold text-red-500 ml-auto">
          {formError}
        </p>
      ) : (
        ""
      )}
      <p className="text-2xl font-bold capitalize mt-2 mb-3">update password</p>
      <div className="flex flex-col sm:flex-row justify-between w-full align-middle my-3">
        <label htmlFor="oPassword" className="font-bold mr-2">
          Old Password
        </label>
        <div>
          <input
            className="w-full border-2 border-slate-400 outline-none px-2 sm:w-[300px]"
            type="password"
            name="oldPassword"
            id="oPassword"
            onChange={handleChange}
            value={data.oldPassword}
          />
          {(data.oldPassword && data?.oldPassword?.length < 6) ||
          data?.oldPassword?.length > 20 ? (
            <p className="text-xs font-semibold text-red-500 ml-auto">
              old password must be betweent 6:20 in length
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between align-middle my-3">
        <label htmlFor="password" className="font-bold mr-2">
          {" "}
          new password
        </label>
        <div>
          <input
            className="w-full border-2 border-slate-400 outline-none px-2 sm:w-[300px]"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={data.password}
          />
          {(data.password && data?.password?.length < 6) ||
          data?.password?.length > 20 ? (
            <p className="text-xs font-semibold text-red-500 ml-auto">
              old password must be betweent 6:20 in length
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between align-middle flex-wrap my-3">
        <label htmlFor="passwordC" className="font-bold mr-2">
          confirm Password
        </label>
        <div>
          <input
            className="w-full border-2 border-slate-400 outline-none px-2 sm:w-[300px]"
            type="password"
            name="passwordComfirmation"
            id="passwordC"
            onChange={handleChange}
            value={data.passwordComfirmation}
          />
          {data.passwordComfirmation &&
          data.password !== data.passwordComfirmation ? (
            <p className="text-xs font-semibold text-red-500 ml-auto">
              confirm password must be equal to new password
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white p-2 rounded capitalize font-semibold"
      >
        {
          isLoading ? 
            <div className="flex items-center gap-1">
              <span className="inline-block w-4 h-4 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
              Updating
            </div>
          :"Update password"
        }
      </button>
    </form>
  );
}
