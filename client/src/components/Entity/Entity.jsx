import React from 'react'
import { Spinner } from 'react-bootstrap'
import BottomBar from './BottomBar'
import Topbar from './Topbar'
import Context from './Context'

const Entity = ({ children, context }) => {

    if (context.state.isLoading) {
        return (
            <Spinner animation="border" variant="primary" />
        )
    }

    return (
        <Context.Provider value={context}>
            <Topbar />
            {children}
            <BottomBar />
        </Context.Provider>
    )
}

export default Entity