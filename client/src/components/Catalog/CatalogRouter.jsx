import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Services from './Services/Services'
import Users from './Users'
import EditUser from '../EditUser'
import AddService from '../../components/Catalog/Services/AddService'
import CatalogPage from '../../pages/CatalogPage'

const CatalogRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/services' element={<Services />} />
                <Route path='/services/add' element={<AddService />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<EditUser />} />                          

            </Routes>
        </>
    )
}

export default CatalogRouter