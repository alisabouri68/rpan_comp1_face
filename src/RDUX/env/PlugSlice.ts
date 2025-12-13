import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import qs from "qs"


export const plugSlice = createApi({
    reducerPath: 'plug',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_OBRO_ADDRESS + ":" + import.meta.env.VITE_OBRO_PORT + "/",
        prepareHeaders: (headers) => {

            const accessToken = window.localStorage.getItem('access_token');
            if (accessToken) headers.set('authorization', accessToken);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAction: builder.query<any, any>({
            query: ({ path, query = {} }) => {
                return path + "?" + qs.stringify(query)
            },
        }),
        postAction: builder.mutation<any, any>({
            query: ({ path, body }) => ({
                url: path,
                method: 'POST',
                body,
            }),
        }),
        putAction: builder.mutation<any, any>({
            query: ({ path, body, headers = {} }) => ({
                url: path,
                method: 'PUT',
                body,
                headers
            }),
        }),
        deleteAction: builder.query<any, any>({
            query: ({ path }) => ({
                url: path,
                method: 'DELETE',
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetActionQuery,
    useLazyGetActionQuery,
    usePostActionMutation,
    usePutActionMutation,
    useDeleteActionQuery,
    useLazyDeleteActionQuery,
} = plugSlice