import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkout } from "../functions/checkout";
import ApplyCoupon from "./ApplyCoupon";

export default function CheckOut() {
  const fullCart = useSelector((state) => state.cart);
  const cart = fullCart.cartItems;
  let sum = 0;
  cart.map((ele) => (sum += ele.price * Number(ele.quantity)));
  return (
    <div className="mx-auto w-fit">
    <ApplyCoupon cartId = {fullCart._id}/>
      <div className="p-3 px-2 mt-4 border border-gray-400 rounded-md">
        <div className="pb-4 border-b-2 border-b-gray-400">
          <p className="flex justify-between font-bold">
            <span>Total Price :</span>
            <span>${sum}</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Discount :</span>
            <span className="text-red-500">
              {fullCart?.coupon?.discount || 0}%
            </span>
          </p>
        </div>
        <div className="pt-4">
          <p className="flex justify-between font-bold">
            <span>Price After Discount:</span>
            <span>$ {fullCart.totalCartPriceAfterDiscount || sum}</span>
          </p>
          <div className="flex flex-col gap-3 mt-5">
            <button
              className="bg-black p-2 w-[60%] text-center text-white font-bold rounded-md mx-auto"
              onClick={()=>checkout(fullCart._id)}
            >
              Purchase
            </button>
            <Link
              to={"/store"}
              className="bg-white p-1 w-[60%] text-center text-black border-2 border-black font-bold rounded-md mx-auto"
            >
              Back To Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
