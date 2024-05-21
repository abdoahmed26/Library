/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProcutReviewsQuery } from "../redux/productsSlice";
import { FaStar } from "react-icons/fa";
import defaultUserImg from "../assets/images/default-user-image.jpg";
import UpdateDeleteComment from "./Update&DeleteComment";
import AddComment from "./AddComment";
import { getReview } from "../redux/ReviewSlice";
export default function ProductComments() {
  const { id } = useParams();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getReview(id))
  },[id])
  const review = useSelector(state=>state.review)
  // console.log(review);
  const reviewResverse = [...review].reverse()
  // console.log(reviewResverse);
  const [comment, setComment] = useState(null);
  const reviews = reviewResverse?.map((r) => {
    return <Comment key={r._id} prodId={id} comment={r} setComment={setComment} />;
  });

  // console.log(reviews);

  return (
    <div>
      {" "}
      {comment ? (
        <AddComment id={id} comment={comment} setComment={setComment} />
      ) : (
        <AddComment id={id} />
      )}
      {review?.length === 0 ? <p>be the firest reviewer</p> : reviews}
    </div>
  );
}

const Comment = ({prodId, comment, setComment }) => {
  const user = useSelector((state) => state.user);
  const [imgSrc, setImgSrc] = useState(
    comment.user.profileImage || defaultUserImg
  );
  
  let dataTime =
    new Date(comment.createdAt).toLocaleDateString() +
    " - " +
    new Date(comment.createdAt).toLocaleTimeString();
  // console.log(comment.user);
  return (
    <div className="relative flex gap-3 sm:flex-row sm:justify-between items-center border my-3 rounded shadow-lg p-2">
      <div className="flex gap-3">
        <div>
          <img
            src={imgSrc}
            alt="user reviewer image"
            onError={() => setImgSrc(defaultUserImg)}
            className="w-9 aspect-square rounded-full border"
          />
        </div>
        <div>
          <div>
            <p className="font-semibold">
              {comment.user.username || comment.user.name}
            </p>
            <p className="text-[11px] font-semibold text-gray-500">
              {dataTime}
            </p>
          </div>
          <p className="flex items-center gap-1 text-xl font-bold text-yellow-400">
            {comment.rate} <FaStar className="text-lg" />
          </p>
          {comment.title && (
            <p className="font-semibold text-gray-600">{comment.title}</p>
          )}
        </div>
      </div>
      <div>
        {comment.user._id === user._id ? (
          <UpdateDeleteComment id={prodId} comment={comment} setComment={setComment} />
        ) : null}
      </div>
    </div>
  );
};
