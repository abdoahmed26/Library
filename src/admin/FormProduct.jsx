/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../redux/productsSlice";
import DefaultImg from "../assets/images/default-book.png"
import { fireToast } from "../functions/alerts";

const FormProduct = ({ele}) => {
    const { data, error, isLoading } = useGetCategoriesQuery();
    const [myData,setData] = useState({}) 
    const [load,setload] = useState(false)
    const myUrl=useNavigate();
    const {register,handleSubmit,formState:{ errors }} = useForm();
    const onSubmit = (data) => {
        setload(true)
        // console.log(myData)
        const book = {
            image: myData.image,
            title: data.title,
            price: +data.price,
            quantity: +data.quantity,
            category: data.category,
            description: data.description,
        }
        console.log(book)
        axios.post("https://ecommerce-api-hlp7.onrender.com/api/product",book,{
            headers : {
                Authorization:`Bearer ${localStorage.token}`,
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            console.log(res)
            fireToast("product Added")
        }).catch(()=>fireToast("faild to Add product", "error"))
        .finally(()=>{
            setload(false)
        });
    }
    const update = ()=>{
        setload(true)
        // console.log(myData);
        axios.put(`https://ecommerce-api-hlp7.onrender.com/api/product/${ele._id}`,myData,{
            headers : {
                Authorization:`Bearer ${localStorage.token}`,
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            console.log(res)
            fireToast("product updated")
        }).catch(()=>fireToast("faild to update product", "error"))
        .finally(()=>{
            setload(false)
        });
    }
    return (
        <div className="flex justify-center py-10">
            <div className="container">
                <div className="max-w-[500px] mx-auto shadow-xl shadow-slate-400 bg-white rounded-md p-5 sm:px-10">
                    <h1 className="text-2xl font-bold text-center">{ele ? "Update Book" : "Add Book"}</h1>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <div className="flex justify-between">
                            <label htmlFor="imageCover" className="p-2 px-3 w-fit font-bold text-white bg-black rounded-md cursor-pointer">
                                Choose a File
                            </label>
                            <input type="file" className="hidden" name="image" id="imageCover" onChange={(e) => setData({...myData,image:e.target.files[0]})}/>
                            <div className="">
                                <img
                                    src={
                                        myData.image ? URL.createObjectURL(myData.image)
                                        : ele ? ele?.imageCover || ele?.image
                                        : DefaultImg
                                    }
                                    className="w-10 h-10 aspect-square inline-block"
                                ></img>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="title" >
                                Title
                            </label>
                            <input type="text" defaultValue={ele?.title} onInput={(e)=>setData({...myData,title:e.target.value})} id="title" {...register("title", { required: "Title is required" })} className="w-full h-10 px-2 border-2 border-gray-400 rounded-lg outline-none" />
                            {errors.title?.message &&
                                <p className="h-5 text-red-500 animate-bounce">{errors.title?.message}</p>
                            }
                        </div>
                        <div className="mt-3">
                            <label htmlFor="price" >
                                Price
                            </label>
                            <input type="text" defaultValue={ele?.price} onInput={(e)=>setData({...myData,price:+e.target.value})} id="price" {...register("price", { required: "Price is required" })} className="w-full h-10 px-2 border-2 border-gray-400 rounded-lg outline-none" />
                            {errors.price?.message &&
                                <p className="h-5 text-red-500 animate-bounce">{errors.price?.message}</p>
                            }
                        </div>
                        <div className="mt-3">
                            <label htmlFor="quantity" >
                                Quantity
                            </label>
                            <input type="text" defaultValue={ele?.quantity} onInput={(e)=>setData({...myData,quantity:+e.target.value})} id="quantity" {...register("quantity", { required: "Quantity is required" })} className="w-full h-10 px-2 border-2 border-gray-400 rounded-lg outline-none" />
                            {errors.quantity?.message &&
                                <p className="h-5 text-red-500 animate-bounce">{errors.quantity?.message}</p>
                            }
                        </div>
                        <div className="mt-3">
                            <label htmlFor="category" >
                                Category
                            </label>
                            <select name="category" defaultValue={ele?.category} onInput={(e)=>setData({...myData,category:e.target.value})} id="category" {...register("category", { required: "Category is required" })} className="w-full h-10 px-2 border-2 border-gray-400 rounded-lg outline-none">
                                {isLoading ? (
                                        <div className="flex justify-center">
                                            <span className="inline-block border-2 border-black rounded-full w-7 h-7 border-l-gray-500 animate-spin"></span>
                                        </div>
                                    ) :
                                    data.data.map((item)=>(<option value={item._id} key={item._id}>{item.name}</option>))
                                }
                            </select>
                            {errors.category?.message &&
                                <p className="h-5 text-red-500 animate-bounce">{errors.category?.message}</p>
                            }
                        </div>
                        <div className="mt-3">
                            <label htmlFor="des" >
                                Description
                            </label>
                            <textarea defaultValue={ele?.description} onInput={(e)=>setData({...myData,description:e.target.value})} id="des" {...register("description", { required: "Description is required" })} className="w-full h-16 py-1 px-2 border-2 border-gray-400 rounded-lg outline-none resize-none" />
                            {errors.description?.message &&
                                <p className="h-5 text-red-500 animate-bounce">{errors.description?.message}</p>
                            }
                        </div>
                        {
                            ele ? 
                            <button type="button" onClick={update} className="p-2 px-3 font-bold text-white bg-blue-500 rounded-md mt-3">
                                {
                                    load?
                                        <div className="flex justify-center">
                                            <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                                        </div>
                                    :"Update"
                                }
                            </button>
                            :<button type="submit" className="p-2 px-3 font-bold text-white bg-blue-500 rounded-md mt-3">
                                {
                                    load?
                                        <div className="flex justify-center">
                                            <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
                                        </div>
                                    :"Add"
                                }
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormProduct;
