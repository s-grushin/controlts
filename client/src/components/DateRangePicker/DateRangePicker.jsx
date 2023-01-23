import { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Confirmation from '../Modals/Confirmation'
import Button from '../Button'
import { Calendar4Range } from 'react-bootstrap-icons'

const DateRangePicker = ({ onPicked, defaultRange, buttonText }) => {

    const [show, setShow] = useState(false)
    const [from, setFrom] = useState(defaultRange.from)
    const [to, setTo] = useState(defaultRange.to)

    const onClickHandler = () => {
        setShow(true)
    }

    const changeDateHandler = (setter, e) => {
        setter(e.target.value)
    }

    const confirmHandler = () => {
        setShow(false)
        onPicked({ from, to, tzOffset: new Date().getTimezoneOffset() })
    }

    return (
        <>
            {
                show ?
                    (<Confirmation
                        show={show}
                        confirmHandler={confirmHandler}
                        cancelHandler={() => setShow(false)}
                        title={buttonText}
                    >
                        <Stack direction='horizontal' gap={3}>
                            <input type="date" name='from' value={from} onChange={(e) => changeDateHandler(setFrom, e)} />
                            <button onClick={() => setFrom('')}>x</button>
                            <input type="date" name='to' value={to} onChange={(e) => changeDateHandler(setTo, e)} />
                            <button onClick={() => setTo('')}>x</button>

                        </Stack>
                    </Confirmation>)
                    :
                    <Button title='' variant='light' onClick={onClickHandler}>
                        {buttonText}
                        &nbsp;<Calendar4Range />
                    </Button>
            }
        </>
    )
}

DateRangePicker.defaultProps = {
    onPicked: () => { },
    defaultRange: { from: '', to: '' },
    buttonText: 'Выбрать период'
}

export default DateRangePicker