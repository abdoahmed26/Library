import { Link } from "react-router-dom";
import empty from "../assets/images/emptyCart.png";
const EmptyCart = () => {
  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-5">
          <div>
            <img src={empty} alt="" className="md:w-[550px] lg:w-auto" />
          </div>
          <div
            className="max-w-[500px] p-4 py-8 bg-white flex gap-2 flex-col items-center rounded-md 
            shadow-lg"
          >
            <h2 className="text-xl font-bold text-black">
              YOUR CART FEELS LONELY.
            </h2>
            <p className="text-sm text-center sm:px-10">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, and make it happy.
            </p>
            <div className="mt-3">
              <Link
                to={"/store"}
                className="px-5 py-2 font-bold text-white duration-300 bg-black rounded bg-primeColor opacity-80 hover:opacity-100 "
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
