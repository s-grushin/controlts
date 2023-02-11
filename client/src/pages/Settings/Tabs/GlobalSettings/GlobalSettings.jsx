import { useEffect, useState } from 'react'
import { Form, Stack } from 'react-bootstrap'
import Button from '../../../../components/Button'
import Spinner from '../../../../components/Spinner'
import useHttp from '../../../../hooks/useHttp'
import useInputChange from '../../../../hooks/useInputChange'

const GlobalSettings = () => {

    const [customZone, setCustomZone] = useState('')

    const inputChange = useInputChange()

    const { request, loading, error } = useHttp()

    useEffect(() => {

        const fetchData = async () => {
            const data = await request('settings')
            data.forEach(item => {
                switch (item.progName) {
                    case 'customZone':
                        setCustomZone(item.value)
                        break
                    default:
                        break;
                }
            })
        }

        fetchData()

    }, [request])


    const saveHandler = async () => {
        await request('/settings', 'put', { customZone })
    }

    return (
        <Form>
            {
                loading
                    ?
                    <Spinner />
                    :
                    error ? 'error'
                        :
                        <>
                            <Form.Label htmlFor="customZone">Таможенная зона</Form.Label>
                            <Form.Control
                                type="text"
                                id="customZone"
                                value={customZone}
                                onChange={(e) => inputChange(e, setCustomZone)}
                            />
                        </>
            }


            <Stack direction='horizontal' className='d-flex justify-content-end mt-2'>
                <Button
                    title='Записать'
                    clickHandler={saveHandler}
                    loading={loading}
                    withSpinner={true}
                />
            </Stack>
        </Form>
    )
}

export default GlobalSettings