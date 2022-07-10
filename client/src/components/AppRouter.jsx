import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout/Layout'
import WorkPage from '../pages/WorkPage'
import CatalogPage from '../pages/CatalogPage'
import Services from './Catalog/Services/Services'
import CreateUpdateService from './Catalog/Services/CreateUpdateService'
import Users from './Catalog/Users/Users'
import CreateUpdateUser from './Catalog/Users/CreateUpdateUser'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/LoginPage'
import { AuthContext } from '../context/AuthProvider'
import Companies from './Catalog/Companies/Companies'
import CreateUpdateCompany from './Catalog/Companies/CreateUpdateCompany'

const AppRouter = () => {

    const auth = useContext(AuthContext)
    const isAuthenticated = !!auth.token

    if (isAuthenticated) {

        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<WorkPage />} />
                        <Route path='login' element={<Navigate to={'/'} />} />
                        <Route path='catalog' element={<CatalogPage />}>
                            <Route path='services' element={<Services />} />
                            <Route path='services/add' element={<CreateUpdateService />} />
                            <Route path='services/:id' element={<CreateUpdateService isUpdateMode={true} />} />
                            <Route path='users' element={<Users />} />
                            <Route path='users/add' element={<CreateUpdateUser />} />
                            <Route path='users/:id' element={<CreateUpdateUser isUpdateMode={true} />} />
                            <Route path='companies' element={<Companies />} />
                            <Route path='companies/add' element={<CreateUpdateCompany />} />
                            <Route path='companies/:id' element={<CreateUpdateCompany isUpdateMode={true} />} />
                        </Route>
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )

    } else {

        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/*' element={<Navigate to='/login' />} />
                </Routes>
            </BrowserRouter>
        )

    }

}

export default AppRouter