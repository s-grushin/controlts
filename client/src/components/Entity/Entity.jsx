import React from 'react'
import BottomBar from './BottomBar'
import Topbar from './Topbar'
import Context from './Context'

const Entity = ({ Content, context }) => {
    return (
        <Context.Provider value={context}>
            <Topbar />
            <Content />
            <BottomBar />
        </Context.Provider>
    )
}

export default Entity