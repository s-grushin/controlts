import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import EntityTopBar from '../AppToolBars/EntityTopBar'
import EntityTable from './EntityTable/EntityTable'


const EntityView = ({ options }) => {

  const Context = createContext(options)

  return (
    <Context.Provider value={options}>
      <div className='mb-2'>
        <EntityTopBar />
      </div>
      <EntityTable entities={options.entities} columns={options.columns} state={options.state} />
    </Context.Provider>
  )
}

EntityView.propTypes = {
  options: PropTypes.object
}

export default EntityView