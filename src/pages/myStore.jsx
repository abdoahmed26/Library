/* eslint-disable no-unused-vars */
import { FaSearch, FaStar } from "react-icons/fa";
import { useGetProductsQuery } from "../redux/productsSlice";
import defaultImage from "../assets/images/DfImage.png";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getBook } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { checkResponseStatus } from "../functions/checkResponseStatus";
import { debounce } from "../functions/debounce";
import Search from "../components/Search";
import AddToCart from "../components/AddToCart";

const MyStore = () => {
  const myUrl = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState([...searchParams.entries()]);
  const [reload, setReload] = useState(0);
  const { data, error, isLoading, refetch } = useGetProductsQuery(searchQuery);

  useEffect(() => {
    setSearchQuery([...searchParams.entries()]);
    refetch();
    console.log(data);
  }, [searchParams]);

  const cart = useSelector((state) => state.cart);
  return (
    <div className="flex justify-center py-10">
      <div className="container">
        <Search setQuery={setSearchQuery} />
        <div className="flex justify-center mt-10">
          {isLoading ? (
            <div className="flex justify-center">
              <span className="inline-block border-2 border-black rounded-full w-7 h-7 border-l-gray-500 animate-spin"></span>
            </div>
          ) : (
            <div>
              <p className="block mb-2 font-semibold">Result: {data.result}</p>
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {data.data.map((ele) => {
                  return ele.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ? (
                    <div
                      key={ele._id}
                      className="pb-2 text-center bg-gray-100 rounded-md shadow-lg"
                    >
                      <Link to={`/bookDetails/${ele._id}`}>
                        <img
                          src={ele.imageCover || defaultImage}
                          alt={ele.title}
                          className="w-full rounded-t-md"
                        />
                      </Link>
                      <div className="px-3">
                        <h1 className="text-lg font-bold">
                          {ele.title.slice(0, 10)}...
                        </h1>
                        <p className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
                          {ele.ratingsAverage.toFixed(1)}{" "}
                          <FaStar className="text-sm" />
                        </p>
                        {/* <p className="my-2 text-sm font-bold text-gray-500 break-words">{ele.description.slice(0,80)}</p> */}
                        <div className="flex items-center justify-between px-2">
                          <p className="font-bold text-red-500">${ele.price}</p>
                          <AddToCart
                            ele={ele}
                            isInCart={cart.cartItems?.some(
                              (e) => e.product === ele._id
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>{" "}
              <Pagination
                pagination={data.pagination}
                setSearchQuery={setSearchQuery}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ pagination }) => {
  const [query, setQuery] = useSearchParams();

  const setPage = (number) => {
    const currentParams = new URLSearchParams(query);

    if (currentParams.has("page")) currentParams.set("page", number);
    else currentParams.append("page", number);

    setQuery(currentParams);
  };
  console.log([...query]);
  return (
    <div className=" mt-3 flex justify-center gap-[3px] flex-wrap">
      {pagination?.previusPage && (
        <button
          className={` border border-gray-400 rounded p-1 w-8 h-8  flex justify-center align-middle `}
          onClick={() => {
            setPage(pagination.previusPage);
          }}
        >
          &lt;&lt;
        </button>
      )}
      {[...Array(pagination?.pages || 0)].map((e, i) => (
        <button
          key={i}
          className={` border border-gray-400 rounded p-1 w-8 h-8  flex justify-center align-middle ${
            pagination.currentPage === i + 1 ? "bg-gray-300" : ""
          }`}
          onClick={() => {
            setPage(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
      {pagination?.nextPage && (
        <button
          className={` border border-gray-400 rounded p-1 w-8 h-8  flex justify-center align-middle `}
          onClick={() => {
            setPage(pagination.nextPage);
          }}
        >
          &gt;&gt;
        </button>
      )}
    </div>
  );
};

export default MyStore;
