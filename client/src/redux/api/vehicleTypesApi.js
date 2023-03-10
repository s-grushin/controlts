import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '../utils'

const vehicleTypesApi = createApi({
    reducerPath: 'vehicleTypes',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER}/api/vehicleTypes`,
        prepareHeaders,
    }),
    endpoints: builder => ({

        getVehicleTypes: builder.query({
            query: (params) => ({
                url: '',
                params
            }),
        }),

    }),
})


export const { useGetVehicleTypesQuery } = vehicleTypesApi
export default vehicleTypesApi