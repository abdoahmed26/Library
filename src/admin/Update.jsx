import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import Spinner from "../components/Spinner";
import UpdateProductForm from "./UpdateProductForm";

const Update = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    useEffect(() => {
        axios.get(`https://ecommerce-api-hlp7.onrender.com/api/product/${id}`)
        .then((res) => setBook(res.data.data));
    }, [id]);
    return (
        <div>
            {
                book.title? <UpdateProductForm ele={book} /> 
                :<div className="pt-10"><Spinner/></div>
            }
        </div>
    );
}

export default Update;
