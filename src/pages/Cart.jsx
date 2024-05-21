/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import FullCart from "../components/FullCart";
import { useGetCartQuery } from "../redux/productsSlice"
import Spinner from "../components/Spinner";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="py-5">
      { cart.cartItems?.length > 0 ? (
        <FullCart />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
