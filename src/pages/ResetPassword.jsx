import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fireToast } from "../functions/alerts";
import Spinner from "../components/Spinner";

export default function ResetPassword() {
  const [currentState, setCurrentState] = useState({});
  const [stageNumber, setStageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const myUrl = useNavigate();
  useEffect(() => {
    if (localStorage.resetCode) {
      setCurrentState({ ...currentState, resetCode: localStorage.resetCode });
      setStageNumber(3);
    } else if (localStorage.email) {
      setCurrentState({ ...currentState, email: localStorage.email });
      setStageNumber(2);
    }
  }, []);

  console.log(currentState, stageNumber);

  const handleFirstStageSubmit = (e) => {
    e.preventDefault();
    if (!currentState?.email) {
      fireToast("enter email", "error");
      return;
    }
    setLoading(true);
    localStorage.resetCode = "";
    axios
      .post(`https://ecommerce-api-hlp7.onrender.com/api/auth/forgetPassword`, {
        email: currentState.email,
      })
      .then((res) => {
        console.log(res);
        fireToast("a code was sent to your email");
        localStorage.email = currentState.email;
        setStageNumber(2);
      })
      .catch((e) => {
        console.log(e);
        fireToast("error occurred while reset password", "error");
      })
      .finally(() => setLoading(false));
  };
  const handleSecondStageSubmit = (e) => {
    e.preventDefault();
    if (!currentState?.resetCode) {
      fireToast("enter reset code", "error");
      return;
    }
    setLoading(true);
    axios
      .post(`https://ecommerce-api-hlp7.onrender.com/api/auth/verifyResetCode`, {
        resetCode: currentState.resetCode,
      })
      .then((res) => {
        console.log(res);
        fireToast("code is submitted successfylly");
        localStorage.resetCode = currentState.resetCode;
        setStageNumber(3);
      })
      .catch((e) => {
        console.log(e);
        const errorMsg =
          e?.response?.data?.message || "error occurred while reset password";
        fireToast(errorMsg, "error");
      })
      .finally(() => setLoading(false));
  };
  const handleThirdStageSubmit = (e) => {
    e.preventDefault();
    if (!currentState?.newPassword) {
      fireToast("enter newPassword", "error");
      return;
    } else if (
      currentState.newPassword.length < 6 ||
      currentState.newPassword.length > 18
    ) {
      fireToast("new password must be between 6:18 chars", "error");
      return;
    }
    setLoading(true);
    axios
      .put(`https://ecommerce-api-hlp7.onrender.com/api/auth/resetPassword`, {
        newPassword: currentState.newPassword,
        email: currentState.email,
      })
      .then((res) => {
        console.log(res);
        fireToast("password is reset sussefully");
        localStorage.removeItem("email");
        localStorage.removeItem("resetCode");
        localStorage.token = res.data.token;
        myUrl("/");
        setStageNumber(3);
      })
      .catch((e) => {
        console.log(e);
        const errorMsg =
          e?.response?.data?.message || "error occurred while reset password";
        fireToast(errorMsg, "error");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="container m-auto p-3 pt-10">
      <div>
        <div
          className={`flex justify-between w-60 max-w-100 m-auto relative mb-5  before:absolute before:w-full before:h-1 before:bg-gray-300 before:top-1/2 before:z-0 after:absolute ${
            stageNumber === 1 && "after:w-0 "
          } ${stageNumber === 2 && "after:w-1/2 "} ${
            stageNumber === 3 && "after:w-full "
          } after:transition-all after-duration-700 after:h-1 after:bg-blue-700 after:top-1/2 after:z-10`}
        >
          <span
            className={`w-6 h-6 rounded-full text-center text-sm font-bold  inline-block leading-6  z-20 ${
              stageNumber >= 1 ? "bg-blue-700 text-white" : "bg-gray-300"
            }`}
          >
            1
          </span>
          <span
            className={`w-6 h-6 rounded-full text-center text-sm font-bold  inline-block leading-6 z-20 ${
              stageNumber >= 2 ? "bg-blue-700 text-white" : "bg-gray-300"
            }`}
          >
            2
          </span>
          <span
            className={`w-6 h-6 rounded-full text-center text-sm font-bold  inline-block leading-6 z-20 ${
              stageNumber >= 3 ? "bg-blue-700 text-white" : "bg-gray-300"
            }`}
          >
            3
          </span>
        </div>
      </div>

      {stageNumber === 1 && (
        <form className="m-auto w-fit p-2" onSubmit={handleFirstStageSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            className="border py-2 px-2 w-80"
            onChange={(e) => {
              if (stageNumber === 1)
                setCurrentState({ ...currentState, email: e.target.value });
            }}
          />
          <button
            type="submit"
            className="block bg-black  text-white capitalize font-semibold mt-2 p-2 rounded w-80"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "send reset code"}
          </button>
        </form>
      )}
      {stageNumber === 2 && (
        <form className="m-auto w-fit p-2" onSubmit={handleSecondStageSubmit}>
          <input
            type="text"
            name="reset"
            placeholder="Enter reset code"
            className="border py-2 px-2 w-80"
            onChange={(e) => {
              if (stageNumber === 2)
                setCurrentState({ ...currentState, resetCode: e.target.value });
            }}
          />
          <button
            type="submit"
            className="block bg-black text-white capitalize font-semibold mt-2 p-2 rounded w-80"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "submit reset code"}
          </button>
          <button
            onClick={handleFirstStageSubmit}
            disabled={isLoading}
            className="block bg-black text-white capitalize font-semibold mt-2 p-2 rounded w-80"
          >
            {isLoading ? <Spinner /> : " Resend code"}
          </button>
        </form>
      )}

      {stageNumber === 3 && (
        <form className="m-auto w-fit p-2" onSubmit={handleThirdStageSubmit}>
          <input
            type="password"
            name=""
            placeholder="Enter new password"
            className="border py-2 px-2 w-80"
            onChange={(e) => {
              if (stageNumber === 3)
                setCurrentState({
                  ...currentState,
                  newPassword: e.target.value,
                });
            }}
          />
          <button
            type="submit"
            className="block bg-black text-white capitalize font-semibold mt-2 p-2 rounded w-80"
          >
            {isLoading ? <Spinner /> : "submit new password"}
          </button>
        </form>
      )}
    </div>
  );
}
