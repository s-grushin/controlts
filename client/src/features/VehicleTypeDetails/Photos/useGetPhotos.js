import useHttp from "hooks/useHttp"

const useGetPhotos = () => {

    const { request, loading, error, clearError } = useHttp(false, 500)

    const getPhotos = async () => {
        return await request('/vehicleMoves/getPhotos')
    }

    return { getPhotos, loading, error, clearError }
}

export default useGetPhotos