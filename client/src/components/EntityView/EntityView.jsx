import React from 'react'
import PropTypes from 'prop-types'
import EntityTopBar from './EntityTopBar'
import EntityTable from './EntityTable/EntityTable'


const EntityView = ({ props }) => {
  return (
    <>
      <div className='mb-2'>
        <EntityTopBar topBar={props.topBar} state={props.state} />
      </div>
      <EntityTable entities={props.entities} columns={props.columns} state={props.state} />
    </>
  )
}

EntityView.propTypes = {
  props: PropTypes.object
}

export default EntityView