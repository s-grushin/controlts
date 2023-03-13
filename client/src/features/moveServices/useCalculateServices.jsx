import useHttp from "hooks/useHttp"

const useCalculateServices = (moveId) => {

    const { request, loading, error, clearError } = useHttp(false, 1000)

    const calculateServices = async () => {
        const response = await request(`/vehicleMoves/calculateServices?moveId=${moveId}`)
        return response
    }

    return { calculateServices, loading, error, clearError }

}

export default useCalculateServices