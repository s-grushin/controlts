import React from 'react'
import PropTypes from 'prop-types'
import EntityActions from './EntityActions'
import EntityTable from './EntityTable'


const EntityList = ({ entities, columns, actions }) => {
  return (
    <>
      <div className='mb-2'>
        <EntityActions actions={actions} />
      </div>
      <EntityTable entities={entities} columns={columns} />
    </>
  )
}

EntityList.propTypes = {
  entities: PropTypes.array,
  columns: PropTypes.array,
  actions: PropTypes.array,
}

export default EntityList