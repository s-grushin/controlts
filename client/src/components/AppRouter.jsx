import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout/Layout'
import WorkPage from '../pages/WorkPage'
import CatalogPage from '../pages/CatalogPage'
import Services from './Catalog/Services/Services'
import CreateUpdateService from './Catalog/Services/CreateUpdateService'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/LoginPage'
import { AuthContext } from '../context/AuthProvider'
import Vehicles from './Catalog/Vehicles/Vehicles'
import CreateUpdateBrand from './Catalog/Vehicles/CreateUpdateBrand'
import CreateUpdateModel from './Catalog/Vehicles/CreateUpdateModel'
import Parkings from './Catalog/Parkings/Parkings'
import CreateUpdateParking from './Catalog/Parkings/CreateUpdateParking'
import DeliveryTypes from './Catalog/DeliveryTypes/DeliveryTypes'
import CreateUpdateDeliveryType from './Catalog/DeliveryTypes/CreateUpdateDeliveryType'
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage'
import UsersList from './Catalog/Users/UsersList'
import CreateUpdateUser from './Catalog/Users/CreateUpdateUser'
import CompaniesList from './Catalog/Companies/CompaniesList'
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
                        <Route path='checkout' element={<CheckoutPage />} />
                        <Route path='catalog' element={<CatalogPage />}>
                            <Route path='services' element={<Services />} />
                            <Route path='services/add' element={<CreateUpdateService />} />
                            <Route path='services/:id' element={<CreateUpdateService isUpdateMode={true} />} />
                            <Route path='users'>
                                <Route index element={<UsersList />} />
                                <Route path='create' element={<CreateUpdateUser variant='create' />} />
                                <Route path=':id' element={<CreateUpdateUser variant='update' />} />
                            </Route>
                            <Route path='companies'>
                                <Route index element={<CompaniesList />} />
                                <Route path='create' element={<CreateUpdateCompany variant='create' />} />
                                <Route path=':id' element={<CreateUpdateCompany variant='update' />} />
                            </Route>
                            <Route path='vehicles' element={<Vehicles />} />
                            <Route path='vehicles/brands/add' element={<CreateUpdateBrand />} />
                            <Route path='vehicles/brands/:id' element={<CreateUpdateBrand isUpdateMode={true} />} />
                            <Route path='vehicles/models/add' element={<CreateUpdateModel />} />
                            <Route path='vehicles/models/:id' element={<CreateUpdateModel isUpdateMode={true} />} />
                            <Route path='parkings' element={<Parkings />} />
                            <Route path='parkings/add' element={<CreateUpdateParking />} />
                            <Route path='parkings/:id' element={<CreateUpdateParking isUpdateMode={true} />} />
                            <Route path='deliveryTypes' element={<DeliveryTypes />} />
                            <Route path='deliveryTypes/add' element={<CreateUpdateDeliveryType />} />
                            <Route path='deliveryTypes/:id' element={<CreateUpdateDeliveryType isUpdateMode={true} />} />
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