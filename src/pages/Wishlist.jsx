import React from "react";
import { useGetWishlistQuery } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { data, isLoading, error } = useGetWishlistQuery();
  console.log(data);
  return isLoading ? (
    "loading..."
  ) : (
    <div className="container m-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-5 px-2">
      {data.data.map((ele) => (
        <ProductCard ele={ele} key={ele._id}/>
      ))}
    </div>
  );
}
