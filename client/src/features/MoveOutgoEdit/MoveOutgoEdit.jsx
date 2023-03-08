import { useState } from 'react'
import AppButton from "components/AppButton"
import InputGroup from "components/InputGroup"
import Confirmation from "components/Modals/Confirmation"
import { Form } from "react-bootstrap"
import { useSaveOutgoMutation } from 'redux/api/movesApi'
import useInputChange from 'hooks/useInputChange'
import AppAlert from 'components/AppAlert'



const MoveOutgoEdit = ({ move }) => {

  const [isShow, setIsShow] = useState(false)

  //modal inputs
  const [cdn, setCdn] = useState('')
  const [outgoAllowed, setOutgoAllowed] = useState(false)
  const [saveOutgo, { isLoading, error, reset }] = useSaveOutgoMutation()
  const inputChange = useInputChange()

  const alertError = error && JSON.stringify(error)

  const confirmHandler = () => {
    saveOutgo({ vehicleMoveId: move.id, cdn, outgoAllowed }).unwrap().then(() => setIsShow(false))
  }

  return (
    <>
      <AppButton onClick={() => setIsShow(true)} disabled={!move}>
        Разрешить выезд
      </AppButton>

      <Confirmation
        show={isShow}
        cancelHandler={() => setIsShow(false)}
        title='Разрешить выезд'
        confirmHandler={confirmHandler}
        isConfirming={isLoading}
      >
        <AppAlert show={alertError} text={alertError} clear={reset} title='ошибка' />
        <InputGroup name='cdn' title='№ ГТД:' readOnly={false} value={cdn} onChange={(e) => inputChange(e, setCdn)} />
        <Form.Check
          name='outgoAllowed'
          className='mt-2 '
          type='checkbox'
          label='Выезд разрешен'
          id='outgoAllowed'
          checked={outgoAllowed}
          onChange={(e) => inputChange(e, setOutgoAllowed)}
        />

      </Confirmation>
    </>
  )
}

export default MoveOutgoEdit