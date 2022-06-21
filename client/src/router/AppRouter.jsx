import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/LoginPage'
import WorkPage from '../pages/WorkPage'
import CatalogPage from '../pages/CatalogPage'
import Services from '../components/Catalog/Services/Services'
import Layout from '../components/Layout/Layout'
import NotFoundPage from '../pages/NotFoundPage'
import CreateUpdateService from '../components/Catalog/Services/CreateUpdateService'
import Users from '../components/Catalog/Users/Users'
import CreateUpdateUser from '../components/Catalog/Users/CreateUpdateUser'

const AppRouter = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (userInfo) {
        // маршруты для авторизованого пользователя
        return (
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<WorkPage />} />
                    <Route path='login' element={<WorkPage />} />
                    <Route path='catalog' element={<CatalogPage />}>
                        <Route path='services' element={<Services />} />
                        <Route path='services/add' element={<CreateUpdateService />} />
                        <Route path='services/:id' element={<CreateUpdateService isUpdateMode={true} />} />
                        <Route path='users' element={<Users />} />
                        <Route path='users/add' element={<CreateUpdateUser />} />
                        <Route path='users/:id' element={<CreateUpdateUser isUpdateMode={true} />} />
                    </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        )
    } else {
        // маршруты для НЕ авторизованого пользователя
        return (
            <Routes>
                <Route path='login' element={<LoginPage />} />
                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        )

    }


}



export default AppRouter