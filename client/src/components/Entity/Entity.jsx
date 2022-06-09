import React from 'react'
import BottomBar from './BottomBar'
import Topbar from './Topbar'
import Context from './Context'

const Entity = ({ children, context }) => {

    return (
        <Context.Provider value={context}>
            <Topbar />
            {
                context.state.isError ? context.state.errorMessage
                    :
                    <>
                        {children}
                        <BottomBar />
                    </>
            }

        </Context.Provider>
    )
}

export default Entity