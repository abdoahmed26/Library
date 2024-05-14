import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const LoginGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,{
            headers : {
                Authorization:`Bearer ${tokenResponse.access_token}`,
                Accept: 'application/json',
            }
            }).then((res)=>{
                console.log(res)
                // onSubmit(res.data)
            })
        },
    });
    return (
        <button className="text-red-500 flex items-center justify-center gap-2 font-semibold py-1 border border-red-500 rounded w-full" 
        onClick={()=>login()}>
            <FaGoogle />
            Google
        </button>
    );
}

export default LoginGoogle;
