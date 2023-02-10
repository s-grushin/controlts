import Accountant from './Accountant'
import AccountantContextProvider from './context/AccountantContextProvider'

const AccountantWrapper = () => {

    return (
        <AccountantContextProvider>
            <Accountant />
        </AccountantContextProvider>)

}

export default AccountantWrapper