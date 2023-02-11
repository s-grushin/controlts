import ServiceTable from "./ServiceTable"
import AppAlert from '../../../../components/AppAlert'
import useAccountantContext from "./hooks/useAccountantContext"

const Accountant = () => {

    const { contextValue } = useAccountantContext()
    const { state, dispatch } = contextValue

    return (
        <>
            <div className="mt-2">
                <AppAlert
                    show={state.error}
                    text={state.error} clear={() => dispatch({ type: 'setError', payload: null })}
                />
            </div>
            < ServiceTable />
        </>
    )
}

export default Accountant