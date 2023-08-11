import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from '../util/pause';


const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(500)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => `/products`,
            providesTags: ['Product']
        }),
        getOneProduct: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        editProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
    })
})

export const { useGetOneProductQuery, useGetProductQuery, useAddProductMutation, useRemoveProductMutation, useEditProductMutation } = productApi
export default productApi