import React from 'react'
import CheckoutHistory from '../components/CheckoutHistory'
import MoveDetails from '../components/MoveDetails'

const MainPage = () => {
  return (
    <div className="row">
      <div className="col-md-7">
        <CheckoutHistory />
      </div>
      <div className="col-md-5">
        <MoveDetails />
      </div>

    </div>
  )
}

export default MainPage