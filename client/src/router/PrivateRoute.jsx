import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ navigateTo }) => {

    const { userInfo } = useSelector(state => state.userLogin)

    return (<>
        {userInfo ?
            <Outlet />
            :
            <Navigate to={navigateTo} />}
    </>)
}

PrivateRoute.defaultProps = {
    navigateTo: 'login'
}

export default PrivateRoute