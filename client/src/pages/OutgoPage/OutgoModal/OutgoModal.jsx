import { useState } from "react"
import AppButton from "../../../components/AppButton"
import { ArrowRight } from 'react-bootstrap-icons'
import Confirmation from '../../../components/Modals/Confirmation'
import OutgoPage from '../OutgoPage'

const OutgoModal = ({ vehicleMoveId }) => {

  const [isShow, setIsShow] = useState(false)

  const confirmHandler = () => {
    console.log('confirmHandler');
    setIsShow(false)
  }

  return (
    <>

      <AppButton
        onClick={() => setIsShow(true)}
      >
        Оформить выезд &nbsp; <ArrowRight color="red" />
      </AppButton>

      {
        isShow
        &&
        <Confirmation
          confirmHandler={confirmHandler}
          cancelHandler={() => setIsShow(false)}
          show={isShow}
          title='Оформление выезда'
          size='lg'
        >

          <OutgoPage vehicleMoveId={vehicleMoveId} />

        </Confirmation>
      }
    </>

  )
}

export default OutgoModal