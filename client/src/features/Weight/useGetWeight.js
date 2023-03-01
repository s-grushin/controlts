import useHttp from "hooks/useHttp"

const useGetWeight = () => {

    const { request, loading, error, clearError } = useHttp(false, 500)

    const getWeight = async () => {
        return await request('/vehicleMoves/getWeight')
    }


    return { getWeight, loading, error, clearError }
}

export default useGetWeight