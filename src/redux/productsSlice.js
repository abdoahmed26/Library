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
        }),
        getCart: builder.query({
            query:()=>{
                return {
                    url:'/cart',
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${localStorage.token}`
                    }
                }
            }
        })
    })
})


export const {useGetProductsQuery, useGetCategoriesQuery, useGetCartQuery} = productsApi