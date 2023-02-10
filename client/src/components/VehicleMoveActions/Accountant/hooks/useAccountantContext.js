import { useContext } from "react";
import { AccountantContext, getEmptyServiceRow } from '../context/AccountantContextProvider'

const useAccountantContext = () => {
    const contextValue = useContext(AccountantContext)
    return { contextValue, getEmptyServiceRow }
}

export default useAccountantContext