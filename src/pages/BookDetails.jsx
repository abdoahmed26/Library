import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
// import { getBook } from "../redux/CartSlice";
// import { useDispatch } from "react-redux";
import AddToCart from "../components/AddToCart";
import { useSelector } from "react-redux";
import ProductComments from "../components/ProductComments";
import Spinner from "../components/Spinner";
import AddToWishlist from "../components/AddToWishlist";
import Share from "../components/Share";
import UpdateDeleteProduct from "../admin/Update&DeleteProduct";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    axios
      .get(`https://ecommerce-api-hlp7.onrender.com/api/product/${id}`)
      .then((res) => setBook(res.data.data));
  }, [id]);
  const user = useSelector(state=>state.user);
  const des = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
  return (
    <div className="container m-auto">
      <div className="flex items-center justify-center pt-10">
        <div className="container">
          {book.title ? (
            <div className="max-w-[700px] mx-auto mb-6">
              <div className="bg-gray-200 relative mb-6 rounded-md flex flex-col sm:flex-row items-center">
                <Share prodId={id}/>
                {user.role !== "admin" && <AddToWishlist prodId={book._id}/>}
                <img src={book.imageCover} alt={book.title} />
                <div className="pb-5 pl-5 pr-5 sm:p-0 sm:pr-5">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-lg font-bold">{book.title}</h1>
                    <p className="font-bold text-gray-500 break-words">
                      {book.description || des}
                    </p>
                    <p className="text-xl font-bold text-red-600">
                      ${book.price}
                    </p>
                    <p className="flex items-center gap-1 text-lg font-bold text-yellow-400">
                      {(book.ratingsAverage)|| 1.0} <FaStar className="text-sm" />
                    </p>
                    {user.role !== "admin" && 
                      <AddToCart ele={book}/>
                    }
                    {user.role === "admin" && <UpdateDeleteProduct ele={book}/>}
                  </div>
                </div>
              </div>
              <ProductComments />
            </div>
          ) : (
            <Spinner/>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default BookDetails;
