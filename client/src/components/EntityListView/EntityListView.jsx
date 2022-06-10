import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import TopBar from './TopBar'
import Table from './Table'
import Modals from './Modals'
import DeleteEntity from './Modals/DeleteEntity'



const EntityListView = ({ context }) => {

  return (
    <Context.Provider value={context}>
      <TopBar />
      <Table />
      <Modals>
        <DeleteEntity />
      </Modals>
    </Context.Provider>
  )
}

EntityListView.propTypes = {
  options: PropTypes.object
}

export default EntityListView