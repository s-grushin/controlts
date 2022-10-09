import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Stack, Table, Spinner, Button } from 'react-bootstrap'
import { getCheckoutData } from '../../api/backend/checkoutApi'
import { getBrand } from '../../api/backend/vehiclesApi'
import { getAll as getCompanies } from '../../api/backend/companyApi'
import Back from '../../components/AppButtons/Back'
import useInputChange from '../../hooks/useInputChange'
import useHttp from '../../hooks/useHttp'
import ReactSelect from 'react-select'
import AsyncSelect from 'react-select/async-creatable'
import LoaderButton from '../../components/AppButtons/LoaderButton'

const CheckoutPage = () => {

    const [formData, setFormData] = useState({
        brandId: null,
        modelId: null,
        weight: 0,
        driver: null,
        deliveryType: null,
        parking: null,
        company: null,
        isOwnCompany: false
    })

    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [parkings, setParkings] = useState([])
    const [deliveryTypes, setDeliveryTypes] = useState([])


    const [inputChangeHandler] = useInputChange(formData, setFormData)

    const { request, loading, error } = useHttp()
    const [requestType, setRequestType] = useState('initial')

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const selectHandler = (value, action) => {

        console.log(action);

        if (action.action === 'select-option') {
            setFormData({ ...formData, [action.name]: value.value })
            if (action.name === 'brandId') {
                // Если марка изменяется, то очистим выбранную модель
                setFormData(formData => ({ ...formData, modelId: null }))
            }

        } else if (action.action === 'clear') {
            setFormData(formData => ({ ...formData, [action.name]: null }))
            if (action.name === 'brandId') {
                // Если марка очищается то очистим модели
                setModels([])
                setFormData(formData => ({ ...formData, brandId: null, modelId: null }))
            }
        }
    }

    const loadOptionsCompany = async (searchValue, callback) => {
        const filteredOptions = await getCompanies(null, null, searchValue)
        callback(refactorItems(filteredOptions.rows))
    }

    useEffect(() => {

        const loadData = async () => {
            const { brands, parkings, deliveryTypes } = await request(getCheckoutData)
            setBrands(refactorItems(brands))
            setParkings(refactorItems(parkings))
            setDeliveryTypes(refactorItems(deliveryTypes))
        }

        loadData()

    }, [])

    useEffect(() => {

        const onBrandChanged = async () => {
            if (formData.brandId) {
                setRequestType('fetchModels')
                const brand = await request(() => getBrand(formData.brandId))
                setModels(refactorItems(brand.models))
            }

        }

        onBrandChanged()

    }, [formData.brandId])


    const refactorItems = (arr) => {
        return arr.map((item) => {
            return { value: item.id, label: item.name }
        })
    }

    return (
        <Row className='d-flex justify-content-center'>
            <div className='mt-2'>
                <Back />
            </div>

            {
                loading && requestType === 'initial' ?
                    <Spinner animation="border" variant="primary" />
                    :
                    error ? error
                        :
                        <Col md={8}>
                            <Row>
                                <Col>

                                    {/* Марка авто */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Марка авто</Form.Label>
                                        <ReactSelect
                                            options={brands}
                                            isClearable
                                            placeholder='Выбрать'
                                            onChange={selectHandler}
                                            name='brandId'
                                            value={brands.find(brand => brand.value === formData.brandId)}
                                        />
                                    </Form.Group>

                                    {/* Модель авто */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Модель авто</Form.Label>
                                        <ReactSelect
                                            options={models}
                                            isClearable
                                            placeholder='Выбрать'
                                            onChange={selectHandler}
                                            name='modelId'
                                            value={formData.modelId ? models.find(model => model.value === formData.modelId) : null}
                                            isDisabled={!formData.brandId}
                                            isLoading={loading && requestType === 'fetchModels'}
                                        />
                                    </Form.Group>

                                    {/* Вес */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Вес, кг</Form.Label>
                                        <Form.Control size='sm' type="number" onChange={inputChangeHandler}
                                            placeholder="Вес"
                                            name="weight"
                                            value={formData.weight} />
                                    </Form.Group>

                                </Col>
                                <Col>

                                    {/* ФИО водителя */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>ФИО водителя</Form.Label>
                                        <ReactSelect options={options} isClearable placeholder='Выбрать' />
                                    </Form.Group>

                                    {/* Вид доставки */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Вид доставки</Form.Label>
                                        <ReactSelect
                                            options={deliveryTypes}
                                            isClearable
                                            placeholder='Выбрать'
                                            onChange={selectHandler}
                                            name='deliveryType'
                                        />
                                    </Form.Group>

                                    {/* Место стоянки */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Место стоянки</Form.Label>
                                        <ReactSelect
                                            options={parkings}
                                            isClearable
                                            placeholder='Выбрать'
                                            onChange={selectHandler}
                                            name='parking'
                                        />
                                    </Form.Group>

                                </Col>
                                <Col>
                                    {/* Код ЕДРПОУ */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Код ЕДРПОУ</Form.Label>
                                        <ReactSelect options={options} isClearable placeholder='Выбрать' />
                                    </Form.Group>

                                    {/* Компания - получатель */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Компания - получатель</Form.Label>
                                        <AsyncSelect
                                            isClearable
                                            placeholder='Выбрать'
                                            loadOptions={loadOptionsCompany}
                                            formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
                                            createOptionPosition='first'
                                            onChange={selectHandler}
                                            name='company'
                                        />
                                    </Form.Group>

                                    {/* Клиент ХФК-Биокон */}
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check label='Клиент ХФК-Биокон' name='isOwnCompany'
                                            defaultChecked={formData.isOwnCompany}
                                            onChange={inputChangeHandler}
                                        />
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <Stack gap={2}>
                                        <div className="bg-light border">
                                            <div className="d-grid gap-2">
                                                <LoaderButton isLoading={false} text='Получить данные с весов и камер' />
                                            </div>
                                        </div>
                                        <div className="bg-light border">
                                            <Table responsive bordered hover size='sm'>
                                                < thead >
                                                    <tr>
                                                        <th>Гос. знак</th>
                                                        <th>Тип</th>
                                                    </tr >
                                                </thead >

                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input type="text" className='tableInput' value={'AA 5555 EE'} onChange={inputChangeHandler} />
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

            }


        </Row>

    )
}

export default CheckoutPage