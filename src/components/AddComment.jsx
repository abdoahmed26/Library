/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { fireToast } from "../functions/alerts";
import axios from "axios";

const AddComment = ({ id,comment }) => {
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
        axios.post(`https://ecommerce-api-hlp7.onrender.com/api/review/`,
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
                window.location.reload()
            });
    };
    const update = ()=>{
        setLoading(true);
        axios.put(`https://ecommerce-api-hlp7.onrender.com/api/review/${comment._id}`,{...data},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }
        )
        .then((res) => {
            console.log(res);
            fireToast("your review updated successfully");
        })
        .catch((err) => {
            console.log(err);
            fireToast("an error occurred while updating the review", "error");
        })
        .finally(() => {
            setLoading(false);
            window.location.reload()
        });
    }
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text" defaultValue={comment?.title}
            className="flex-1 py-2 border-b-2 border-gray-500 focus:border-green-700 text-lg outline-none"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Add your review"
          />
          <select defaultValue={comment?.rate} 
            className="p-2 border-b-2 border-gray-500 focus:border-green-700 text-lg outline-none"
            onChange={(e) => setData({ ...data, rate: e.target.value })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {
            comment ? 
            <button onClick={()=>update()}
                disabled={isLoading}
                className="bg-black text-white p-1 font-bold capitalize rounded"
            >
                {isLoading ? "loading..." : "Update review"}
            </button>
            :<button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white p-1 font-bold capitalize rounded"
            >
                {isLoading ? "loading..." : "Add review"}
            </button>
          }
        </form>
      </div>
    );
};
export default AddComment;