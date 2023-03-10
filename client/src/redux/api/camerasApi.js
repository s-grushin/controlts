import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '../utils'

const camerasApi = createApi({
    reducerPath: 'cameras',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER}/api/cameras`,
        prepareHeaders,
    }),
    endpoints: builder => ({

        getCameras: builder.query({
            query: (params) => ({
                url: '',
                params
            }),
        }),

    }),
})


export const { useGetCamerasQuery } = camerasApi
export default camerasApi