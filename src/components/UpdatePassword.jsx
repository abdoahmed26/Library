import { useState } from "react";
import { useSelector } from "react-redux";


export default function UpdatePassword() {
    const {_id} = useSelector(state=>state.user)
    const [data, setData] = useState({})
    console.log(_id, data)
    const handleSubmit = (e)=>{

        e.preventDefault();
    }

    const handleChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }
  return (
   <form onSubmit={handleSubmit} className="rounded border-2 border-slate-500 mt-3 p-3">
    <p className="text-2xl font-bold capitalize mt-2 mb-3">update password</p>
    <div className="flex justify-between align-middle flex-wrap">
        <label htmlFor="oPassword" className="font-bold mr-2">Old Password</label>
        <input 
        className="flex-1 border-2 border-slate-400 outline-none px-2 "
        type="password" 
        name="oldPassword" 
        id="oPassword" 
        onChange={handleChange}/>
    </div>
    <div className="flex justify-between align-middle flex-wrap">
        <label htmlFor="password" className="font-bold mr-2"> new password</label>
        <input 
        className="flex-1 border-2 border-slate-400 outline-none px-2 "
        type="password" 
        name="password" 
        id="password" 
        onChange={handleChange}/>
    </div>
    <div className="flex justify-between align-middle flex-wrap">
        <label htmlFor="passwordC" className="font-bold mr-2">confirm Password</label>
        <input 
        className="flex-1 border-2 border-slate-400 outline-none px-2 "
        type="password" 
        name="passwordComfirmation" 
        id="passwordC" 
        onChange={handleChange}/>
    </div>
   </form>
  )
}
