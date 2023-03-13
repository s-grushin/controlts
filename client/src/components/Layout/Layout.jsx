import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNavbar from './TopNavbar'

const Layout = () => {
    return (
        <>
            <TopNavbar />
            <div className='container-xl'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout