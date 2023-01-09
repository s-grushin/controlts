import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout/Layout'
import CatalogPage from '../pages/CatalogPage'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/LoginPage'
import { AppGlobalDataContext } from '../context/AppGlobalDataProvider'
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage'
import UsersList from './Catalog/Users/UsersList'
import CreateUpdateUser from './Catalog/Users/CreateUpdateUser'
import CompaniesList from './Catalog/Companies/CompaniesList'
import CreateUpdateCompany from './Catalog/Companies/CreateUpdateCompany'
import ServicesList from './Catalog/Services/ServicesList'
import CreateUpdateService from './Catalog/Services/CreateUpdateService'
import ParkingsList from './Catalog/Parkings/ParkingsList'
import CreateUpdateParking from './Catalog/Parkings/CreateUpdateParking'
import DeliveryTypesList from './Catalog/DeliveryTypes/DeliveryTypesList'
import CreateUpdateDeliveryType from './Catalog/DeliveryTypes/CreateUpdateDeliveryType'
import VehicleBrandsList from './Catalog/VehicleBrands/VehicleBrandsList'
import CreateUpdateVehicleBrand from './Catalog/VehicleBrands/CreateUpdateVehicleBrand'
import CreateUpdateVehicleModel from './Catalog/VehicleBrands/CreateUpdateVehicleModel'
import VehicleTypesList from './Catalog/VehicleTypes/VehicleTypesList'
import CreateUpdateVehicleType from './Catalog/VehicleTypes/CreateUpdateVehicleType'
import Dashboard from '../pages/Dashboard'
import VehicleDetailsProvider from '../context/VehicleDetailsProvider'
import ProfilePage from '../pages/ProfilePage'


const AppRouter = () => {

    const { isAuth } = useContext(AppGlobalDataContext)

    if (isAuth) {

        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='login' element={<Navigate to={'/'} />} />
                        <Route path='profile' element={<ProfilePage />} />
                        <Route path='checkout' element={<VehicleDetailsProvider><CheckoutPage /></VehicleDetailsProvider>} />

                        <Route path='catalog' element={<CatalogPage />}>
                            <Route path='services'>
                                <Route index element={<ServicesList />} />
                                <Route path='create' element={<CreateUpdateService variant='create' />} />
                                <Route path=':id' element={<CreateUpdateService variant='update' />} />
                            </Route>
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
                            <Route path='parkings'>
                                <Route index element={<ParkingsList />} />
                                <Route path='create' element={<CreateUpdateParking variant='create' />} />
                                <Route path=':id' element={<CreateUpdateParking variant='update' />} />
                            </Route>
                            <Route path='deliveryTypes'>
                                <Route index element={<DeliveryTypesList />} />
                                <Route path='create' element={<CreateUpdateDeliveryType variant='create' />} />
                                <Route path=':id' element={<CreateUpdateDeliveryType variant='update' />} />
                            </Route>
                            <Route path='vehicleBrands'>
                                <Route index element={<VehicleBrandsList />} />
                                <Route path='create' element={<CreateUpdateVehicleBrand variant='create' />} />
                                <Route path=':id' element={<CreateUpdateVehicleBrand variant='update' />} />
                                <Route path='models/create/:brandId' element={<CreateUpdateVehicleModel variant='create' />} />
                                <Route path='models/:id' element={<CreateUpdateVehicleModel variant='update' />} />
                            </Route>
                            <Route path='vehicleTypes'>
                                <Route index element={<VehicleTypesList />} />
                                <Route path='create' element={<CreateUpdateVehicleType variant='create' />} />
                                <Route path=':id' element={<CreateUpdateVehicleType variant='update' />} />
                            </Route>
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