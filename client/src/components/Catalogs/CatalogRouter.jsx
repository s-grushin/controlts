import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Services from './Services'
import Users from './Users'

const CatalogRouter = () => {
    return (
        <Routes>
            <Route path='/services' element={<Services />} />
            <Route path='/users' element={<Users />} />
        </Routes>
    )
}

export default CatalogRouter