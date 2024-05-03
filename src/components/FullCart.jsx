import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../assets/images/DfImage.png";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { decrement, deleteFromCart, increment } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const FullCart = () => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    let sum = 0;
    cart.map((ele)=>sum +=ele.price*ele.quantity)
    return (
        <div className="py-10 flex justify-center">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="pt-3 px-4 border border-gray-400 rounded-md sm:w-full lg:w-[70%]">
                        <h1 className="font-bold text-2xl">Your Shopping Cart</h1>
                        <div className="mt-5 overflow-auto">
                            <table className="w-[555px] sm:w-full">
                                <tbody className="">
                                    {
                                        cart.map((ele)=>
                                        <tr className="" key={ele.id}>
                                            <td className="pb-5"><img src={defaultImage} alt={ele.title} className="w-20 h-20"/></td>
                                            <td>
                                                <h1 className="font-bold text-xl text-center">{ele.title.slice(0,10)}</h1>
                                                <p className="text-yellow-400 flex justify-center items-center gap-1 text-lg font-bold">
                                                    {ele.ratingsAverage} <FaStar className="text-sm"/>
                                                </p>
                                            </td>
                                            <td>
                                                <div className="flex gap-3 items-center justify-center">
                                                    <p className="font-bold text-2xl">{ele.quantity}</p>
                                                    <div className="flex flex-col gap-2">
                                                        <button onClick={()=>dispatch(increment(ele))} className="border-[3px] border-black rounded-lg h-[24px] px-1 font-bold text-[14px]">
                                                            <FaPlus/>
                                                        </button>
                                                        <button onClick={()=>dispatch(decrement(ele))} className="border-[3px] border-black rounded-lg h-[24px] px-1 font-bold text-[14px]">
                                                            <FaMinus/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col items-center justify-center">
                                                    <p className="text-2xl text-red-600 font-bold">
                                                        ${ele.price*ele.quantity}
                                                    </p>
                                                    <p className="text-gray-400 font-bold">${ele.price} / per Item</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col items-center justify-center">
                                                    <button onClick={()=>dispatch(deleteFromCart(ele))} className="bg-black p-2 px-3 text-white font-bold rounded-md">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-fit mx-auto">
                        <div className="p-3 px-2 border border-gray-400 rounded-md">
                            <form action="">
                                <p className="font-bold" htmlFor="coupon">Have Coupon ?</p>
                                <input type="text" className="lg:w-[170px] xl:w-fit border-2 border-black rounded-md px-1 outline-none" name="coupon" id="coupon" />
                                <button className="bg-black text-white py-1 px-2 rounded-md ml-2">apply</button>
                            </form>
                        </div>
                        <div className="p-3 px-2 border border-gray-400 rounded-md mt-4">
                            <div className="border-b-2 border-b-gray-400 pb-4">
                                <p className="font-bold flex justify-between">
                                    <span>Total Price :</span>
                                    <span>${sum}</span>
                                </p>
                                <p className="font-bold flex justify-between">
                                    <span>Discount :</span>
                                    <span className="text-red-500">-$2.52</span>
                                </p>
                                <p className="font-bold flex justify-between">
                                    <span>TAX :</span>
                                    <span>$1.5</span>
                                </p>
                            </div>
                            <div className="pt-4">
                                <p className="font-bold flex justify-between">
                                    <span>Total Price :</span>
                                    <span>${(sum+1.5-2.52).toFixed(2)}</span>
                                </p>
                                <div className="mt-5 flex flex-col gap-3">
                                    <Link to={"/checkout"} className="bg-black p-2 w-[60%] text-center text-white font-bold rounded-md mx-auto">
                                        Purchase
                                    </Link>
                                    <Link to={"/store"} className="bg-white p-1 w-[60%] text-center text-black border-2 border-black font-bold rounded-md mx-auto">
                                        Back To Store
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullCart;