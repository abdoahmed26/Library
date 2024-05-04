import { useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import FullCart from "../components/FullCart";

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    return (
        <div className="h-[100%]">
            {
                cart.length > 0 ? <FullCart /> : <EmptyCart />
            }
        </div>
    );
}

export default Cart;
