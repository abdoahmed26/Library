import { logout } from "./logout"

export const checkResponseStatus = (e, navigate)=>{
    let status = e?.response?.status
    if(status===401)logout(navigate)
    else if(status===403)navigate("/forbidden")
    else console.log(e.response)
}