import { Link } from "react-router-dom";
import defaultImage from "../assets/images/default-book.png";
import { useGetCategoriesQuery } from "../redux/productsSlice";
export default function FeaturedCategories() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useGetCategoriesQuery();
  console.log(data, error, isLoading);
  return (
    <div className="container m-auto">
      <h2 className="text-center text-3xl mb-10 font-bold">
        Featured Categories
      </h2>
      {isLoading ? (
        <div className="flex justify-center">
          <span className="inline-block w-7 h-7 border-2 border-black border-l-gray-500 rounded-full animate-spin"></span>
        </div>
      ) : data.result === 0 || error ? (
        <p className="text-center text-gray-500 text-lg capitalize font-semibold">
          there is no categories !{" "}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center gap-2 md:gap-3">
          {data.data.map((category) => (
            <CategoryCard
              key={category._id}
              title={category.name}
              image={category.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const CategoryCard = ({ title, image }) => {
  return (
    <div className="p-3 bg-slate-100 rounded-lg text-center">
      <img
        src={image || defaultImage}
        alt="category image"
        className="block m-auto"
      />
      <h3 className="font-bold text-lg">{title}</h3>
      <Link
        to={"/store"}
        className="text-sm text-gray-600 font-semibold hover:underline underline-offset-4"
      >
        shop now
      </Link>
    </div>
  );
};
