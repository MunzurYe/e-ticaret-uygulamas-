
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "@/types/product";



export const productApi = createApi({

    reducerPath: "productApi",

    baseQuery: fetchBaseQuery({
        // baseUrl: "https://fakestoreapi.com/"
        baseUrl: "http://localhost:4444/"
    }),

    endpoints: (builder) => ({
         getProducts:builder.query<Product[],void>({
            query:()=>"products"
        }),
        getProduct: builder.query<Product,number>({
            query: (id) => `products/${id}`
        }),
    }),
})

export const { useGetProductsQuery,useGetProductQuery } = productApi
