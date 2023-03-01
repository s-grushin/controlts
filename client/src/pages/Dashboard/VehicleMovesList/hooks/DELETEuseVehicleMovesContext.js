import { useContext } from "react";
import { VehicleMovesContext } from '../context/DELETEVehicleMovesProvider'

const useVehicleMovesContext = () => {
    const contextValue = useContext(VehicleMovesContext)
    return { contextValue }
}

export default useVehicleMovesContext