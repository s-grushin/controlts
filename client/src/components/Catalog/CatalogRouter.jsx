import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Services from './Services'
import Users from './Users'
import EditUser from '../EditUser'

const CatalogRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/services' element={<Services />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<EditUser />} />
            </Routes>
        </>
    )
}

export default CatalogRouter