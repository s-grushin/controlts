import { useState } from 'react'
import { Form, Stack } from 'react-bootstrap'
import Confirmation from '../Modals/Confirmation'
import Button from '../Button'
import AppButton from '../AppButton'
import { Calendar4Range } from 'react-bootstrap-icons'
import { dateRangeToISO } from '../../utils/common'

const DateRangePicker = ({ onPicked, defaultRange, buttonText, renderButton }) => {

    const [show, setShow] = useState(false)
    const [from, setFrom] = useState(defaultRange.from)
    const [to, setTo] = useState(defaultRange.to)

    const onClickHandler = () => {
        setShow(true)
    }

    const confirmHandler = () => {
        setShow(false)
        console.log({ from, to });
        onPicked(dateRangeToISO(from, to))
    }

    const dateChangeHandler = (e, setter) => {
        setter(e.target.value)
    }

    const dateClickHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            {
                show &&
                <Confirmation
                    show={show}
                    confirmHandler={confirmHandler}
                    cancelHandler={() => setShow(false)}
                    title={buttonText}
                >
                    <Form>
                        <Stack direction='horizontal' gap={3}>

                            <Form.Control
                                size='sm'
                                type="date"
                                onClick={dateClickHandler}
                                value={from}
                                onChange={(e) => dateChangeHandler(e, setFrom)}
                            />
                            <AppButton variant='outline-danger' onClick={() => setFrom('')}>x</AppButton>

                            <Form.Control
                                onClick={dateClickHandler}
                                size='sm'
                                type="date"
                                value={to}
                                onChange={(e) => dateChangeHandler(e, setTo)}
                            />
                            <AppButton variant='outline-danger' onClick={() => setTo('')}>x</AppButton>

                        </Stack>
                    </Form>

                </Confirmation>

            }

            {
                <div onClick={onClickHandler}>
                    {

                        renderButton()
                        ||
                        <Button title='' variant='light' >
                            {buttonText}
                            &nbsp;<Calendar4Range />
                        </Button>
                    }
                </div>
            }



        </>
    )
}

DateRangePicker.defaultProps = {
    onPicked: () => { },
    defaultRange: { from: '', to: '' },
    buttonText: 'Выбрать период',
    renderButton: () => { }
}

export default DateRangePicker