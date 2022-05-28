import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthPage from '../pages/AuthPage'
import MainPage from '../pages/MainPage'
import VehicleCheckoutPage from '../pages/VehicleCheckoutPage'
import CatalogsPage from '../pages/CatalogsPage'

const AppRouter = () => {
    const userState = useSelector(state => state.user)

    if (userState.isAuth) {
        // маршруты для авторизованого пользователя
        return (
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/checkout' element={<VehicleCheckoutPage />} />
                <Route path='/catalogs/' element={<CatalogsPage />} />
                <Route path='/catalogs/:catalog' element={<CatalogsPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        )
    } else {
        // маршруты для НЕ авторизованого пользователя
        return (
            <Routes>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
            </Routes>
        )

    }


}



export default AppRouter