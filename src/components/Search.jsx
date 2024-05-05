import  { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoOptionsOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

export default function Search({ setQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    setQuery((state) => [...state, [e.target.name, e.target.value]]);
  };
  return (
    <div>
      <div className="p-2 border-2 border-gray-400 flex items-center justify-between   max-w-full   rounded">
        <input
          type="text"
          name="search"
          placeholder="What your looking for ?"
          className="w-full outline-none placeholder:text-gray-500 placeholder:font-bold"
          onChange={(e) => handleChange(e)}
          value={searchParams.get("search")}
        />
        <span className="text-gray-500">
          <FaSearch />
        </span>
        <button
          className="text-3xl ml-2 border-2 rounded border- border-gray-300 focus:border-gray-800"
          onClick={() => setShowOptions((s) => !s)}
        >
          <IoOptionsOutline />
        </button>
      </div>

      <form
        className={`overflow-hidden transition-transform  origin-top  ${
          showOptions ? "scale-y-1 h-auto" : "scale-y-0 h-0"
        } border-2 border-slate-400 rounded border-t-transparent w-[300px] ml-auto p-2`}
      >
        <p className="font-bold capitalize">sort by</p>
        <p className="font-semibold">price</p>
        <label className="text-sm m-1 font-medium text-gray-500 capitalize" htmlFor="leastPrice">from least</label>
        <input
          type="radio"
          name="sort"
          id="leastPrice"
          value="price"
          onChange={(e) => handleChange(e)}
        />
        <label className="text-sm m-1 font-medium text-gray-500 capitalize" htmlFor="mostPrice">from most</label>
        <input
          type="radio"
          name="sort"
          value="-price"
          id="mostPrice"
          onChange={(e) => handleChange(e)}
        />
        <p className="font-semibold">Ratings</p>
        <label className="text-sm m-1 font-medium text-gray-500 capitalize" htmlFor="leastRatings">from least</label>
        <input
          type="radio"
          name="sort"
          id="leastRatings"
          value="ratingsAverage"
          onChange={(e) => handleChange(e)}
        />
        <label className="text-sm m-1 font-medium text-gray-500 capitalize" htmlFor="mostRatings">from most</label>
        <input
          type="radio"
          name="sort"
          value="-ratingsAverage"
          id="mostRatings"
          onChange={(e) => handleChange(e)}
        />
        <p className="font-semibold">Ratings average: {searchParams.get("ratingsAverage[gte]")|| 0}</p>
        <input type="range" name="ratingsAverage[gte]" id="ratingsAverage" defaultValue={1} min={1} max={5} step={1} onChange={(e)=>handleChange(e)}/>
        <input
          type="reset"
          onClick={() => {
            setSearchParams({});
            setQuery([]);
          }}
          className="block bg-black text-white p-1 w-full cursor-pointer rounded"
        />
      </form>
    </div>
  );
}
