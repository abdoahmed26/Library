import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkout } from "../functions/checkout";

export default function CheckOut() {
  const fullCart = useSelector((state) => state.cart);
  const cart = fullCart.cartItems
  // console.log(fullCart)
  let sum = 0;
  cart.map((ele) => (sum += ele.price * Number(ele.quantity)));
  const discount = sum - fullCart.totalCartpriceAfterDiscount || 0;

  return (
    <div className="mx-auto w-fit">
      <div className="p-3 px-2 border border-gray-400 rounded-md">
        <form action="">
          <p className="font-bold" htmlFor="coupon">
            Have Coupon ?
          </p>
          <input
            type="text"
            className="lg:w-[170px] xl:w-fit border-2 border-black rounded-md px-1 outline-none"
            name="coupon"
            id="coupon"
          />
          <button className="px-2 py-1 ml-2 text-white bg-black rounded-md">
            apply
          </button>
        </form>
      </div>
      <div className="p-3 px-2 mt-4 border border-gray-400 rounded-md">
        <div className="pb-4 border-b-2 border-b-gray-400">
          <p className="flex justify-between font-bold">
            <span>Total Price :</span>
            <span>${sum.toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Discount :</span>
            <span className="text-red-500">
              {discount}
            </span>
          </p>
        </div>
        <div className="pt-4">
          <p className="flex justify-between font-bold">
            <span>Price After Discount:</span>
            <span>${(sum - discount).toFixed(2)}</span>
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
