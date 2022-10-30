import { useState, useEffect } from 'react'
import { Row, Col, Form, Stack } from 'react-bootstrap'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Spinner from '../../components/Spinner'
import Selector from '../../components/Selector'
import useHttp from '../../hooks/useHttp'

const CheckoutPage = () => {

    const [brandOptions, setBrandOptions] = useState([])
    const [modelOptions, setModelOptions] = useState([])
    const [selectedBrandId, setSelectedBrandId] = useState(null)
    const [selectedModelId, setSelectedModelId] = useState(null)
    const [formIsLoaded, setFormIsLoaded] = useState(false)

    const { request, loading } = useHttp()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log({ brand: selectedBrandId, model: selectedModelId });
    }

    useEffect(() => {
        const getCheckoutData = async () => {
            const { brands } = await request('/vehicleMoves/getCheckoutData')
            setBrandOptions(brands)
            setFormIsLoaded(true)
        }
        getCheckoutData()
    }, [request])

    useEffect(() => {
        // При изменении бренда, получим модели с сервера
        const fetchModels = async (brandId) => {
            if (!brandId) {
                return
            }
            const { rows } = await request(`/vehicle/models?brandId=${brandId}`)
            setModelOptions(rows)
        }
        fetchModels(selectedBrandId)
    }, [selectedBrandId, request])


    if (loading && !formIsLoaded) {
        return (
            <div className='mx-auto mt-5 d-flex justify-content-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <Row className='mt-2'>
            <Form onSubmit={submitHandler}>
                <Col md={8} className='mx-auto'>
                    <Row>
                        <Col md={4}>

                            {/* Марка авто */}
                            <Form.Group className="mb-3">
                                <Form.Label>Марка авто</Form.Label>
                                <Selector
                                    options={brandOptions}
                                    setSelectedId={setSelectedBrandId}
                                />
                            </Form.Group>

                            {/* Модель авто */}
                            <Form.Group className="mb-3">
                                <Form.Label>Модель авто</Form.Label>
                                <Selector
                                    options={modelOptions}
                                    setSelectedId={setSelectedModelId}
                                    selectedId={selectedModelId}
                                    isDisabled={!selectedBrandId}
                                    isLoading={loading}
                                />
                            </Form.Group>

                            {/* Вес */}
                            <Form.Group className="mb-3">
                                <Form.Label>Вес, кг</Form.Label>
                                <Form.Control size='sm' type="number"
                                    placeholder="Вес"
                                    name="weight"
                                    value={''}
                                    onChange={() => { }}
                                />
                            </Form.Group>

                        </Col>
                        <Col md={4}>
                            {/* ФИО водителя */}
                            <Form.Group className="mb-3">
                                <Form.Label>ФИО водителя</Form.Label>
                                <Selector options={[]} />
                            </Form.Group>

                            {/* Вид доставки */}
                            <Form.Group className="mb-3">
                                <Form.Label>Вид доставки</Form.Label>
                                <Selector options={[]} />
                            </Form.Group>

                            {/* Место стоянки */}
                            <Form.Group className="mb-3">
                                <Form.Label>Место стоянки</Form.Label>
                                <Selector options={[]} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            {/* Код ЕДРПОУ */}
                            <Form.Group className="mb-3">
                                <Form.Label>Код ЕДРПОУ</Form.Label>
                                <Selector options={[]} />
                            </Form.Group>

                            {/* Компания - получатель */}
                            <Form.Group className="mb-3">
                                <Form.Label>Компания - получатель</Form.Label>
                                <Selector options={[]} />
                            </Form.Group>

                            {/* Клиент ХФК-Биокон */}
                            <Form.Group className="mb-3" controlId="isOwnCompany">
                                <Form.Check label='Клиент ХФК-Биокон' name='isOwnCompany'
                                    defaultChecked={false}
                                    onChange={() => { }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <Stack gap={2}>
                                <div className="bg-light border">
                                    <div className="d-grid gap-2">
                                        <Button type='submit' title='Получить данные с весов и камер' />
                                    </div>
                                </div>
                                <div className="bg-light border">
                                    <Table>
                                        < thead >
                                            <tr>
                                                <th>Гос. знак</th>
                                                <th>Тип</th>
                                            </tr >
                                        </thead >

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="text" className='tableInput' value={'AA 5555 EE'} onChange={() => { }} />
                                                </td>
                                                <td>
                                                    <select size='' className='tableInput'>
                                                        <option value="123">Тягач</option>
                                                        <option value="123">Прицеп</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </Table>
                                </div>
                            </Stack>
                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Col>
            </Form>
        </Row>

    )
}

export default CheckoutPage