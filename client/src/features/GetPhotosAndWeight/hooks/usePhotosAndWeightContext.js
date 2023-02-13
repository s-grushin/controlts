import { useContext } from "react";
import { PhotosAndWeightContext } from '../context/PhotosAndWeightProvider'

const usePhotosAndWeightContext = () => {
    const contextValue = useContext(PhotosAndWeightContext)
    return { contextValue }
}

export default usePhotosAndWeightContext