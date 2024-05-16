import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fireToast } from "../functions/alerts";
import Spinner from "../components/Spinner";
const LoginGoogle = () => {
  const [isLoading, setLoading] = useState(false);
  const myUrl = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(true);
          console.log(res);
          const data = {
            email: res.data.email,
            username: res.data.name,
            profileImage: res.data.picture,
          };

          axios
            .post("http://localhost:5000/api/auth/google", data)
            .then((res) => {
              console.log(res);
              localStorage.token = res.data.token;
              document.cookie = "token=" + res.data.token;
              fireToast("google login success");
              myUrl("/");
              window.location.reload();
            })
            .catch((e) => {
              fireToast("google login faild", "error");
              console.log(e);
            })
            .finally(() => setLoading(false));
        });
    },
  });
  return (
    <button
      className="text-red-500 flex items-center justify-center gap-2 font-semibold py-1 border border-red-500 rounded w-full"
      onClick={() => login()}
    >
      <FaGoogle />
      Google
      {isLoading && (
        <div className="flex justify-center">
          <span className="inline-block border-2 border-red-700 rounded-full w-5 h-5 border-l-red-300 animate-spin"></span>
        </div>
      )}
    </button>
  );
};

export default LoginGoogle;
