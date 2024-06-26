import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-api-hlp7.onrender.com/api/",
  }),
  tagTypes: ["Product", "Category", "Cart"],
  endpoints: (builder) => ({
    // eslint-disable-next-line no-unused-labels
    getProducts: builder.query({
      query: (searchQuery) => {
        let paramsObj = {};
        searchQuery.forEach((e) => {
          console.log("search query", e[0], e[1]);
          paramsObj[e[0]] = e[1];
        });
        return {
          url: "/product",
          params: { ...paramsObj, limit: 10 },
        };
      },
      providesTags: "Product",
    }),
    getCategories: builder.query({
      query: () => "category",
    }),
    getCart: builder.query({
      query: () => {
        return {
          url: "/cart",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        };
      },
    }),
    getProcutReviews: builder.query({
      query: (product) => `review?product=${product}`,
    }),
    getWishlist:builder.query({
        query:()=>{
            return{
                url:"/wishlist",
                method:"GET",
                headers:{
                  Authorization:`Bearer ${localStorage.token}`,
                }
            }
        }
    }),
    addToWishlist: builder.mutation({
      query: (prodId) => {
        return {
          url: "/wishlist",
          method: "post",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: {
            product: prodId,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetCartQuery,
  useGetProcutReviewsQuery,
  useAddToWishlistMutation,
  useGetWishlistQuery
} = productsApi;
