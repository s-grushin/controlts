import { useContext } from "react";
import { AccountantContext, getEmptyServiceRow, saveServices } from '../context/AccountantContextProvider'

const useAccountantContext = () => {
    const contextValue = useContext(AccountantContext)
    return { contextValue, getEmptyServiceRow, saveServices }
}

export default useAccountantContext