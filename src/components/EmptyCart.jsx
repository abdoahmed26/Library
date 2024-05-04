import { Link } from "react-router-dom";
import empty from "../assets/images/emptyCart.png";
const EmptyCart = () => {
    return (
        <div className="py-10 flex justify-center">
            <div className='container'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div>
                        <img src={empty} alt="" className='md:w-[550px] lg:w-auto'/>
                    </div>
                    <div className="max-w-[500px] p-4 py-8 bg-white flex gap-2 flex-col items-center rounded-md 
                    shadow-lg">
                        <h2 className='text-black font-bold text-xl'>
                            YOUR CART FEELS LONELY.
                        </h2>
                        <p className='text-center text-sm sm:px-10'>
                            Your Shopping cart lives to serve. Give it purpose - fill it with books, 
                            electronics, videos, etc. and make it happy.
                        </p>
                        <div className='mt-3'>
                            <Link to={"/store"}
                            className='px-5 py-2 bg-primeColor text-white
                            rounded font-bold bg-black opacity-80 hover:opacity-100 duration-300 '>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyCart;
