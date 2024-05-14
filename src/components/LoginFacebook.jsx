/* eslint-disable react/no-children-prop */
import FacebookLogin from "@greatsumini/react-facebook-login"
import { FaFacebookF } from "react-icons/fa"

const ButtonFacebook = ()=>{
    return(
        <button
        className="text-blue-500 flex items-center justify-center gap-2 py-1 font-semibold border border-blue-500 rounded w-full"
        >
            <FaFacebookF />
            Facebook
        </button>
    )
}

const LoginWithFacebook = ()=>{
    return(
        <FacebookLogin className="w-full"
            children={<ButtonFacebook/>}
            appId="419684830940609"
            fields="name,email,picture"
            autoLoad={true}
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
        />
    )
}
export default LoginWithFacebook;