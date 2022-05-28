import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthPage from '../pages/AuthPage'
import MainPage from '../pages/MainPage'
import VehicleCheckoutPage from '../pages/VehicleCheckoutPage'

const AppRouter = () => {
    const userState = useSelector(state => state.user)

    if (userState.isAuth) {
        // маршруты для залогиненого пользователя
        return (
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/checkout' element={<VehicleCheckoutPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        )
    } else {
        // маршруты для НЕ залогиненого пользователя
        return (
            <Routes>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
            </Routes>
        )

    }


}



export default AppRouter