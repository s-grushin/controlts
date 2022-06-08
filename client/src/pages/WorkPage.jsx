import React from 'react'
import VehicleMovesJournal from '../components/VehicleMovesJournal'
import VehicleMoveDetails from '../components/VehicleMoveDetails'

const WorkPage = () => {
  return (
    <div className="row">
      <div className="col-md-7 mt-1">
        <VehicleMovesJournal />
      </div>
      <div className="col-md-5 mt-1">
        <VehicleMoveDetails />
      </div>

    </div>
  )
}

export default WorkPage