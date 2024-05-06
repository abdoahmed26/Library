import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../assets/images/DfImage.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { decrement, increment } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkResponseStatus } from "../functions/checkResponseStatus";
import ButtonDelete from "./buttonDelete";
import CheckOut from "./CheckOut";

const FullCart = () => {
  const fullCart = useSelector((state) => state.cart);
  const cart = fullCart.cartItems
  const dispatch = useDispatch();
  // console.log(fullCart)
  let sum = 0;
  cart.map((ele) => (sum += ele.price * Number(ele.quantity)));

  const myUrl = useNavigate();
  const incrCart = (ele) => {
    const quant = Number(ele.quantity) + 1;
    axios
      .put(
        `https://ecommerce-api-hlp7.onrender.com/api/cart/${ele.product._id}`,
        // `http://localhost:5000/api/cart/${ele.product._id}`,
        { quantity: quant },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzJjN2I0ZTRkZGZkNmQzMTk0YTExZSIsImlhdCI6MTcxNTAxODk1MywiZXhwIjoxNzE1MTkxNzUzfQ.EBskF-c41nQVowT-74_OQWEwQoZKOhdPbjxxNmKL7Zg`,
          },
        }
      )
      .then(() => dispatch(increment(ele)))
      .catch((e) => {
        checkResponseStatus(e, myUrl);
      });
  };
  const decrCart = (ele) => {
    if(ele.quantity > 0) {
      const quant = Number(ele.quantity) - 1;
      axios
        .put(
          `https://ecommerce-api-hlp7.onrender.com/api/cart/${ele.product._id}`,
          { quantity: quant },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then(() => dispatch(decrement(ele)))
        .catch((e) => {
          checkResponseStatus(e, myUrl);
        });
    }
  };
  // console.log(cart)
  return (
    <div className="flex justify-center py-10">
      <div className="container">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="pt-3 px-4 border border-gray-400 rounded-md sm:w-full lg:w-[70%]">
            <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
            <div className="mt-5 overflow-auto">
              <table className="w-[555px] sm:w-full">
                <tbody className="">
                  {cart.map((ele) => (
                    <tr className="" key={ele._id}>
                      <td className="pb-5">
                        <img
                          src={ele.product.imageCover || defaultImage}
                          alt={ele.product.title}
                          className="w-24 h-24"
                        />
                      </td>
                      <td>
                        <h1 className="text-xl font-bold text-center">
                          {ele.product?.title.slice(0,10)}...
                        </h1>
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-2xl font-bold">{ele.quantity}</p>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => incrCart(ele)}
                              className="border-[3px] border-black rounded-lg h-[24px] px-1 font-bold text-[14px]"
                            >
                              <FaPlus />
                            </button>
                            <button
                              onClick={() => decrCart(ele)}
                              className="border-[3px] border-black rounded-lg h-[24px] px-1 font-bold text-[14px]"
                            >
                              <FaMinus />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-2xl font-bold text-red-600">
                            ${(ele.price * Number(ele.quantity)).toFixed(2)}
                          </p>
                          <p className="font-bold text-gray-400">
                            ${ele.price} / per Item
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center justify-center">
                          <ButtonDelete element={ele} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CheckOut totalPrice={fullCart.totalCartPrice} priceAfterDiscount={fullCart.totalPriceAfterDiscount || fullCart.totalCartPrice}/>
        </div>
      </div>
    </div>
  );
};

export default FullCart;
