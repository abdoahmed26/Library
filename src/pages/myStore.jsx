/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const MyStore = () => {
  const myUrl = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState([...searchParams.entries()]);
  const [reload, setReload] = useState(0);
  const { data, error, isLoading, refetch } = useGetProductsQuery(searchQuery);
  // console.log(data.data);
  useEffect(() => {
    setSearchQuery([...searchParams.entries()]);
    refetch();
    // console.log(data);
  }, [searchParams]);

  return (
    <div className="flex justify-center py-10">
      <div className="container">
        <Search setQuery={setSearchQuery} />
        <div className="flex justify-center mt-10">
          {isLoading ? (
            <Spinner/>
          ) : (
            <div>
              <p className="block mb-2 font-semibold">Result: {data.result}</p>
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {data.data.map((ele) => {
                  return <ProductCard ele={ele} key={ele._id} />;
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
