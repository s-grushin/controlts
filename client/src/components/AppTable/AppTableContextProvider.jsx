import { useEffect, useReducer, createContext } from 'react'

export const AppTableContext = createContext()


const reducer = (state, action) => {

    switch (action.type) {

        case 'initItems':
            return { ...state, items: action.payload }
        case 'setColumnsQty':
            if (state.columnsQty) {
                return { ...state }
            } else {
                return { ...state, columnsQty: action.payload }
            }
        case 'addItem':
            return { ...state, items: [...state.items, action.payload] }
        case 'deleteItem':
            return { ...state, items: state.items.filter(item => item.id !== action.payload) }
        case 'clearItems':
            return { ...state, items: [] }
        case 'setSelectedItem': {
            return { ...state, selectedId: action.payload }
        }
        default:
            return { ...state };
    }

}

const initState = {
    items: [],
    selectedId: null,
    columnsQty: 0
}


const AppTableContextProvider = ({ children, columns, initItems, options, handlers }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {

        dispatch({ type: 'initItems', payload: initItems })
        dispatch({ type: 'setColumnsQty', payload: columns.length })

    }, [initItems, columns.length])


    return (
        <AppTableContext.Provider value={{ state, dispatch, columns, options, handlers }}>
            {children}
        </AppTableContext.Provider>)

}


export default AppTableContextProvider