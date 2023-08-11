import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from '../util/pause';


const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(500)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (user) => ({
                url: `/auth/signin`,
                method: 'POST',
                body: user
            })
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: user
            })
        }),
    })
})

export const { useSigninMutation, useSignupMutation } = authApi
export default authApi