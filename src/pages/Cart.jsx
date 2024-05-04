import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import FullCart from "../components/FullCart";
import { useGetCartQuery } from "../redux/productsSlice";
import { addToCart } from "../redux/CartSlice";
import { useEffect, useState } from "react";

const Cart = () => {
  const { data, isError, isLoading } = useGetCartQuery();
  const [cart, setCart] = useState(useSelector((state) => state.cart));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data, isError, isLoading);
    dispatch(addToCart(data?.data || {}));
    setCart(data?.data);
  }, [data, isLoading, isError]);
  // console.log(cart.cartItems)
  return (
    <div className="h-[100%]">
      {isLoading ? (
        <div className="flex justify-center">
          <span className="inline-block w-7 h-7 border-2 border-black border-l-gray-500 rounded-full animate-spin"></span>
        </div>
      ) : cart ? (
        <FullCart />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
