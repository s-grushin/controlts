import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '../utils'

const movesApi = createApi({
    reducerPath: 'moves',
    tagTypes: ['Moves'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER}/api/vehicleMoves`,
        prepareHeaders,
    }),
    endpoints: builder => ({

        getMoves: builder.query({
            query: (params) => ({
                url: '',
                params
            }),
            providesTags: ['Moves']
        }),

        getMoveById: builder.query({
            query: (id) => ({
                url: id
            })
        }),

        saveServices: builder.mutation({
            query: (body) => ({
                url: 'saveServices',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Moves']
        }),

        savePayData: builder.mutation({
            query: (body) => ({
                url: 'savePayData',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Moves']
        }),

        saveOutgo: builder.mutation({
            query: (body) => ({
                url: 'saveOutgo',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Moves']
        }),

        createMove: builder.mutation({
            query: (body) => ({
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Moves']
        }),

        checkout: builder.mutation({
            query: (body) => ({
                url: 'checkout',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Moves']
        }),

    }),
})


export const { useGetMovesQuery, useGetMoveByIdQuery, useSaveServicesMutation, useSavePayDataMutation, useSaveOutgoMutation, useCreateMoveMutation, useCheckoutMutation } = movesApi
export default movesApi