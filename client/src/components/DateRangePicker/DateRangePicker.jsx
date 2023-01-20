import { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Confirmation from '../Modals/Confirmation'
import Button from '../Button'
import { Calendar4Range } from 'react-bootstrap-icons'

const DateRangePicker = ({ onPicked, defaultRange, buttonText }) => {

    const [show, setShow] = useState(false)
    const [dateFrom, setDateFrom] = useState(defaultRange.from)
    const [dateTo, setDateTo] = useState(defaultRange.to)

    const onClickHandler = () => {
        setShow(true)
    }

    const changeDateHandler = (setter, e) => {
        setter(e.target.value)
    }

    const confirmHandler = () => {
        setShow(false)
        onPicked({ dateFrom, dateTo })
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
                            <input type="date" name='dateFrom' value={dateFrom} onChange={(e) => changeDateHandler(setDateFrom, e)} />
                            <button onClick={() => setDateFrom('')}>x</button>
                            <input type="date" name='dateTo' value={dateTo} onChange={(e) => changeDateHandler(setDateTo, e)} />
                            <button onClick={() => setDateTo('')}>x</button>

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