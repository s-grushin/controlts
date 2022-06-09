import React from 'react'
import BottomBar from './BottomBar'
import Topbar from './Topbar'
import Context from './Context'

const Entity = ({ children, context }) => {
    return (
        <Context.Provider value={context}>
            <Topbar />
            {children}
            <BottomBar />
        </Context.Provider>
    )
}

export default Entity