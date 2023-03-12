import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '../utils'

const moveRegistrationPhotoSettingsApi = createApi({
    reducerPath: 'moveRegistrationPhotoSettings',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER}/api/moveRegistrationPhotoSettings`,
        prepareHeaders,
    }),
    endpoints: builder => ({

        getMoveRegistrationPhotoSettings: builder.query({
            query: (params) => ({
                url: '',
                params
            }),
        }),

    }),
})


export const { useGetMoveRegistrationPhotoSettingsQuery, useLazyGetMoveRegistrationPhotoSettingsQuery } = moveRegistrationPhotoSettingsApi
export default moveRegistrationPhotoSettingsApi