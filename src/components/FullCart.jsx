import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../assets/images/DfImage.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { decrement, deleteFromCart, increment } from "../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { checkResponseStatus } from "../functions/checkResponseStatus";
// import { useGetCartQuery } from "../redux/productsSlice";

const FullCart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("cart",cart);
  const dispatch = useDispatch();
  
  let sum = 0;
  cart.map((ele) => (sum += ele.price * Number(ele.quantity)));

  const myUrl = useNavigate();
  const incrCart = (ele) => {
    const quant = Number(ele.quantity) + 1;
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
  const deleCart = (ele) => {
    axios
      .delete(`https://ecommerce-api-hlp7.onrender.com/api/cart/${ele._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(() => dispatch(deleteFromCart(ele)))
      .catch((e) => {
        checkResponseStatus(e, myUrl);
      });
  };
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
                    <tr className="" key={ele.product.id}>
                      <td className="pb-5">
                        <img
                          src={ele.product.imageCover || defaultImage}
                          alt={ele.product.title}
                          className="w-24 h-24"
                        />
                      </td>
                      <td>
                        <h1 className="text-xl font-bold text-center">
                          {ele.product.title}
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
                            ${ele.price * Number(ele.quantity)}
                          </p>
                          <p className="font-bold text-gray-400">
                            ${ele.price} / per Item
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            onClick={() => deleCart(ele)}
                            className="p-2 px-3 font-bold text-white bg-black rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                  <span className="text-red-500">-$2.52</span>
                </p>
                <p className="flex justify-between font-bold">
                  <span>TAX :</span>
                  <span>$1.5</span>
                </p>
              </div>
              <div className="pt-4">
                <p className="flex justify-between font-bold">
                  <span>Total Price :</span>
                  <span>${(sum + 1.5 - 2.52).toFixed(2)}</span>
                </p>
                <div className="flex flex-col gap-3 mt-5">
                  <Link
                    to={"/checkout"}
                    className="bg-black p-2 w-[60%] text-center text-white font-bold rounded-md mx-auto"
                  >
                    Purchase
                  </Link>
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
        </div>
      </div>
    </div>
  );
};

export default FullCart;
