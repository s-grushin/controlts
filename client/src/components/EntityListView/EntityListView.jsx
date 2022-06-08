import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import TopBar from './TopBar'
import Table from './Table'


const EntityListView = ({ options }) => {

  return (
    <Context.Provider value={options}>
      <TopBar />
      <Table />
    </Context.Provider>
  )
}

EntityListView.propTypes = {
  options: PropTypes.object
}

export default EntityListView