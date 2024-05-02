import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl:"https://ecommerce-api-hlp7.onrender.com/api/"}),
    endpoints: (builder)=>({
        // eslint-disable-next-line no-unused-labels
        getProducts: builder.query({
            query:()=>'product',
        }),
        getCategories: builder.query({
            query:()=>'category',
        })
    })
})


export const {useGetProductsQuery, useGetCategoriesQuery} = productsApi