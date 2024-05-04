import { Link } from "react-router-dom";
import defaultImage from "../assets/images/default-book.png";
import { useGetCategoriesQuery } from "../redux/productsSlice";
export default function FeaturedCategories() {
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useGetCategoriesQuery();
  return (
    <div className="container m-auto">
      <h2 className="mb-10 text-3xl font-bold text-center">
        Featured Categories
      </h2>
      {isLoading ? (
        <div className="flex justify-center">
          <span className="inline-block border-2 border-black rounded-full w-7 h-7 border-l-gray-500 animate-spin"></span>
        </div>
      ) : data.result === 0 || error ? (
        <p className="text-lg font-semibold text-center text-gray-500 capitalize">
          there is no categories !{" "}
        </p>
      ) : (
        <div className="grid justify-center grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 md:gap-3">
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
    <div className="p-3 text-center rounded-lg bg-slate-100">
      <img
        src={image || defaultImage}
        alt="category image"
        className="block m-auto"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <Link
        to={"/store"}
        className="text-sm font-semibold text-gray-600 hover:underline underline-offset-4"
      >
        shop now
      </Link>
    </div>
  );
};
