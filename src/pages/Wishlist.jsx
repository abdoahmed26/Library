/* eslint-disable no-unused-vars */
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useGetWishlistQuery } from "../redux/productsSlice";

export default function Wishlist() {
  const favourite = useSelector(state=>state.favourite);
  return (
    <div className="py-8 flex justify-center">
      <div className="container">
        {
          favourite.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-5 px-2">
              {favourite.map((ele) => (
                <ProductCard ele={ele} key={ele._id}/>
              ))}
            </div>
          ) :favourite.length === 0 ?  (
            <div className="text-center pt-10">
              <p className="text-lg font-semibold text-gray-500">
                There is no Favourites!
              </p>
            </div>
          ):(
            <div className="pt-10">
              <Spinner/>
            </div>
          )
        }
      </div>
    </div>
  )
}
