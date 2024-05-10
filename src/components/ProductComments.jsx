import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fireToast } from "../functions/alerts";
import { useSelector } from "react-redux";
import { useGetProcutReviewsQuery } from "../redux/productsSlice";
import { FaStar } from "react-icons/fa";
import defaultUserImg from "../assets/images/default-user-image.jpg";
export default function ProductComments() {
  const { id } = useParams();
  //   console.log(id);
  const { data, isLoading, isError } = useGetProcutReviewsQuery(id);
  console.log(data, isLoading, isError);

  const reviews = data?.data?.map((r) => {
    return (
      <Comment
        key={r._id}
        img={r.user.profileImage}
        rate={r.rate}
        title={r.title || ""}
        name={r.user.username}
        createdAt = {r.createdAt}
      />
    );
  });

  console.log(reviews);
  return (
    <div>
      {" "}
      <AddComment id={id} />
      {data?.result === 0 ? <p>be the firest reviewer</p> : reviews}
    </div>
  );
}

const Comment = ({ img, rate, title, name, createdAt }) => {
    let dataTime = new Date(createdAt).toLocaleDateString() + ' - ' +new Date(createdAt).toLocaleTimeString();
    console.log(dataTime);
  return (
    <div className="flex gap-3 border mt-3 mb-2 rounded shadow-lg p-2">
      <div>
        <img
          src={img || defaultUserImg}
          alt="user reviewer image"
          className="w-9 rounded-full border"
        />
      </div>
      <div>
        <div>
        <p className="font-semibold">{name}</p>
        <p className="text-[11px] font-semibold text-gray-500">{dataTime}</p>
        </div>
        <p className="flex items-center gap-1 text-xl font-bold text-yellow-400">
          {rate} <FaStar className="text-lg" />
        </p>
        {title && <p className="font-semibold text-gray-600">{title}</p>}
      </div>
    </div>
  );
};

const AddComment = ({ id }) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  //   console.log(user)
  //   console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.rate) {
      fireToast("you must select rate from 1:5", "error");
      return;
    }
    setLoading(true);
    axios
      .post(
        `https://ecommerce-api-hlp7.onrender.com/api/review/`,
        { ...data, product: id, user: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        fireToast("your review added successfully");
      })
      .catch((err) => {
        console.log(err);
        fireToast("an error occurred while adding the review", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 py-2 border-b-2 border-gray-500 focus:border-green-700 text-lg outline-none"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Add your review"
        />
        <select
          className="p-2 border-b-2 border-gray-500 focus:border-green-700 text-lg outline-none"
          onChange={(e) => setData({ ...data, rate: e.target.value })}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white p-1 font-bold capitalize rounded"
        >
          {isLoading ? "loading..." : "Add review"}
        </button>
      </form>
    </div>
  );
};
