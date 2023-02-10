import Accountant from './Accountant'
import AccountantContextProvider from './context/AccountantContextProvider'

const AccountantWrapper = ({ vehicleMoveId }) => {

    return (
        <AccountantContextProvider vehicleMoveId={vehicleMoveId}>
            <Accountant />
        </AccountantContextProvider>)

}

export default AccountantWrapper