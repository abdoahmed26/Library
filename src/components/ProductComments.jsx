/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProcutReviewsQuery } from "../redux/productsSlice";
import { FaStar } from "react-icons/fa";
import defaultUserImg from "../assets/images/default-user-image.jpg";
import UpdateDeleteComment from "./Update&DeleteComment";
import AddComment from "./AddComment";
export default function ProductComments() {
  const { id } = useParams();
  //   console.log(id);
  const { data, isLoading, isError } = useGetProcutReviewsQuery(id);
  console.log(data, isLoading, isError);
  const [comment,setComment] = useState(null)
  const reviews = data?.data?.map((r) => {
    return (
      <Comment
        key={r._id}
        comment={r}
        setComment={setComment}
      />
    );
  });

  console.log(reviews);

  
  return (
    <div>
      {" "}
      {
        comment? (
          <AddComment id={id} comment={comment} />
        ) : (
          <AddComment id={id} />
        )
      }
      {data?.result === 0 ? <p>be the firest reviewer</p> : reviews}
    </div>
  );
}

const Comment = ({ comment,setComment }) => {
  const user = useSelector(state=>state.user)
  let dataTime = new Date(comment.createdAt).toLocaleDateString() + ' - ' +new Date(comment.createdAt).toLocaleTimeString();
  console.log(dataTime);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between items-center border my-3 rounded shadow-lg p-2">
      <div className="flex gap-3">
        <div>
          <img
            src={comment.user.profileImage || defaultUserImg}
            alt="user reviewer image"
            className="w-9 rounded-full border"
          />
        </div>
        <div>
          <div>
          <p className="font-semibold">{comment.user.username || comment.user.name}</p>
          <p className="text-[11px] font-semibold text-gray-500">{dataTime}</p>
          </div>
          <p className="flex items-center gap-1 text-xl font-bold text-yellow-400">
            {comment.rate} <FaStar className="text-lg" />
          </p>
          {comment.title && <p className="font-semibold text-gray-600">{comment.title}</p>}
        </div>
      </div>
      <div>
        {
          comment.user._id ===user._id?
          <UpdateDeleteComment comment={comment} setComment={setComment}/>
          :null
        }
      </div>
    </div>
  );
};