import { STORAGE_KEYS } from 'constants/appConstants'

export const prepareHeaders = (headers) => {
    headers.append('Authorization', "Bearer " + localStorage.getItem(STORAGE_KEYS.authToken))
}