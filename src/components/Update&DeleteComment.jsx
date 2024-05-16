/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

const UpdateDeleteComment = ({ comment, setComment }) => {
  const [load, setLoad] = useState(false);
  const [isOpen , setOpen] = useState(false);
  const deleteComment = (ele) => {
    setLoad(true);
    axios
      .delete(`https://ecommerce-api-hlp7.onrender.com/api/review/${ele._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((res) => console.log(res))
      .finally(() => window.location.reload());
  };
  const update = (ele) => {
    setComment({ ...ele });
  };
  return (
    <div className="w-24 absolute top-1 right-1 ">
      <div className="flex flex-col">
        <button onClick={()=>setOpen(!isOpen)} className="w-7 h-7  rounded-full text-center block ml-auto active:bg-gray-200 ">
          <GoKebabHorizontal />
        </button>
        {isOpen && <div className="text-center font-semibold text-sm shadow-lg">
          <button onClick={() => update(comment)} className="p-1 px-2 border-b">
            Update
          </button>
          <button
            onClick={() => deleteComment(comment)}
            disabled={load}
            className="p-1 px-2"
          >
            {load ? (
              <div className="flex justify-center">
                <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-l-gray-500 animate-spin"></span>
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>}
        
      </div>
    </div>
  );
};

export default UpdateDeleteComment;
