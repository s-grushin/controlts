import { useMemo, useState } from "react"
import AppButton from "../../../components/AppButton"
import { ArrowRight } from 'react-bootstrap-icons'
import Confirmation from '../../../components/Modals/Confirmation'
import OutgoPage from '../OutgoPage'

const OutgoModal = ({ vehicleMoveId }) => {

  const [isShow, setIsShow] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [triggerSave, setTriggerSave] = useState(0)


  const confirmHandler = () => {
    setIsSaving(true)
    setTriggerSave(prev => prev + 1)
  }

  const showModal = () => {
    setIsShow(true)
    setIsSaving(false)
    setTriggerSave(0)
  }

  const triggerAfterSave = () => {
    setIsShow(false)
    setIsSaving(false)
  }

  const triggerOnError = () => {
    setIsSaving(false)
  }

  const triggerOptions = useMemo(() => ({
    save: {
      triggerSave,
      triggerAfterSave,
      triggerOnError,
    }
  }), [triggerSave])


  return (
    <>

      <AppButton
        onClick={showModal}
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
          isConfirming={isSaving}
        >

          <OutgoPage
            vehicleMoveId={vehicleMoveId}
            triggerOptions={triggerOptions}
          />

        </Confirmation>
      }
    </>

  )
}

export default OutgoModal