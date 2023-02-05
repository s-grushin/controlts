import { useContext } from 'react'
import AppTableContextProvider from './AppTableContextProvider'
import { AppTableContext } from './AppTableContextProvider'

const useAppTable = () => {

    const contextValue = useContext(AppTableContext)

    return { AppTableContextProvider, AppTableContext, contextValue }
}

export default useAppTable