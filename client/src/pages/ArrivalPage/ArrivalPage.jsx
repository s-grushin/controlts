import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Stack } from 'react-bootstrap'
import useInputChange from 'hooks/useInputChange'
import Button from 'components/Button'
import Spinner from 'components/Spinner'
import useHttp from 'hooks/useHttp'
import Selector from 'components/Selectors/Selector'
import VehicleTypeDetails from 'features/VehicleTypeDetails/VehicleTypeDetails'
import Photos from 'features/VehicleTypeDetails/Photos'
import useGetPhotos from 'features/VehicleTypeDetails/Photos/useGetPhotos'
import useGetWeight from 'features/Weight/useGetWeight'
import { STORAGE_KEYS } from 'constants/appConstants'
import VehicleTypeDetailsProvider from 'features/VehicleTypeDetails/ContextProvider'
import { useCreateMoveMutation } from 'redux/api/movesApi'
import AppAlert from 'components/AppAlert'
import { mapCameraDataToMoveDetails } from 'features/VehicleTypeDetails/helpers'


const ArrivalPage = () => {

    const [brandOptions, setBrandOptions] = useState([])
    const [modelOptions, setModelOptions] = useState([])
    const [deliveryTypesOptions, setDeliveryTypesOptions] = useState([])
    const [parkingOptions, setParkingOptions] = useState([])

    const [selectedBrandId, setSelectedBrandId] = useState(null)
    const [selectedModelId, setSelectedModelId] = useState(null)
    const [weight, setWeight] = useState(0)
    const [selectedDriverId, setSelectedDriverId] = useState(null)
    const [selectedDeliveryTypeId, setSelectedDeliveryTypeId] = useState(null)
    const [selectedParkingId, setSelectedParkingId] = useState(null)
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [isOwnCompany, setIsOwnCompany] = useState(false)
    const [comment, setComment] = useState('')

    const [cameraData, setCameraData] = useState([])

    const [formIsLoaded, setFormIsLoaded] = useState(false)

    const { request, loading } = useHttp()
    const inputChangeHandler = useInputChange()

    const navigate = useNavigate()

    const { getPhotos, loading: photosLoading, error: photosError, clearError: photosClearError } = useGetPhotos()
    const { getWeight, loading: weightLoading, error: weightError, clearError: weightClearError } = useGetWeight()

    const [createMove, { isLoading: createLoading, isError: createIsError, error: createError, reset: createReset }] = useCreateMoveMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        const vehicleDetails = JSON.parse(localStorage.getItem(STORAGE_KEYS.newVehicleDetails))

        const formData = {
            brandId: selectedBrandId,
            modelId: selectedModelId,
            weightIn: weight,
            driverId: selectedDriverId,
            deliveryTypeId: selectedDeliveryTypeId,
            parkingId: selectedParkingId,
            companyId: selectedCompanyId,
            isOwnCompany,
            comment,
            vehicleDetails,
        }

        await createMove(formData).unwrap().then(() => navigate('/'))

    }

    const getWeightAndCameraData = async () => {

        const [camera, weightData] = await Promise.all([getPhotos(), getWeight()])
        const weight = weightData.value
        setCameraData(camera)
        setWeight(weight)
    }

    const moveDetails = cameraData?.length > 0 ? mapCameraDataToMoveDetails(cameraData) : []

    useEffect(() => {
        const getArrivalData = async () => {
            const { brands, deliveryTypes, parkings } = await request('/vehicleMoves/getArrivalData')
            setBrandOptions(brands)
            setDeliveryTypesOptions(deliveryTypes)
            setParkingOptions(parkings)
            setFormIsLoaded(true)
        }
        getArrivalData()
    }, [request])

    useEffect(() => {
        // При изменении бренда, получим модели с сервера
        const fetchModels = async (brandId) => {
            //при изменении бренда очистим селектор выбора моделей
            setSelectedModelId(null)
            if (!brandId) {
                return
            }
            const { rows } = await request(`/vehicle/models?brandId=${brandId}`)
            setModelOptions(rows)

        }
        fetchModels(selectedBrandId)
    }, [selectedBrandId, request])

    useEffect(() => {
        // При изменении компании, очистим поле водителя
        setSelectedDriverId(null)

    }, [selectedCompanyId])


    if (loading && !formIsLoaded) {
        return (
            <div className='mx-auto mt-5 d-flex justify-content-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <Row className='mt-2' >
            <Form onSubmit={submitHandler}>
                <Col md={8} className='mx-auto'>
                    <Row>
                        <Col md={4}>

                            <Form.Group className="mb-3">
                                <Form.Label>Марка авто</Form.Label>
                                <Selector
                                    options={brandOptions}
                                    selectedId={selectedBrandId}
                                    setSelectedId={setSelectedBrandId}
                                    postUrl='/vehicle/brands'
                                />
                            </Form.Group>

                            {/* Модель авто */}
                            <Form.Group className="mb-3">
                                <Form.Label>Модель авто</Form.Label>
                                <Selector
                                    options={modelOptions}
                                    selectedId={selectedModelId}
                                    setSelectedId={setSelectedModelId}
                                    isDisabled={!selectedBrandId}
                                    isLoading={loading}
                                    parentId={selectedBrandId}
                                    postUrl='/vehicle/models'
                                    postData={{ brandId: selectedBrandId }}
                                />
                            </Form.Group>

                            {/* Вес */}
                            <Form.Group className="mb-3">
                                <Form.Label>Вес, кг</Form.Label>
                                <Form.Control size='sm' type="number"
                                    placeholder="Вес"
                                    name="weight"
                                    value={weight}
                                    onChange={(e) => inputChangeHandler(e, setWeight)}
                                />
                            </Form.Group>

                        </Col>
                        <Col md={4}>

                            {/* Компания - получатель */}
                            <Form.Group className="mb-3">
                                <Form.Label>Компания - получатель</Form.Label>
                                <Selector
                                    inputSearchUrl='/companies'
                                    selectedId={selectedCompanyId}
                                    setSelectedId={setSelectedCompanyId}
                                    placeholder='Поиск по ЕДРПОУ или названию'
                                    postUrl='/companies'
                                />
                            </Form.Group>

                            {/* ФИО водителя */}
                            <Form.Group className="mb-3">
                                <Form.Label>ФИО водителя</Form.Label>
                                <Selector
                                    inputSearchUrl='/companies/getDriverHistory'
                                    inputSearchQueryParams={`&companyId=${selectedCompanyId}`}
                                    selectedId={selectedDriverId}
                                    setSelectedId={setSelectedDriverId}
                                    placeholder='Поиск по ФИО'
                                    isDisabled={!selectedCompanyId}
                                    presentationField='fullName'
                                    postUrl='/drivers'
                                    name='driver'
                                    parentId={selectedCompanyId}
                                />
                            </Form.Group>


                        </Col>
                        <Col md={4}>

                            {/* Вид доставки */}
                            <Form.Group className="mb-3">
                                <Form.Label>Вид доставки</Form.Label>
                                <Selector
                                    options={deliveryTypesOptions}
                                    selectedId={selectedDeliveryTypeId}
                                    setSelectedId={setSelectedDeliveryTypeId}
                                />
                            </Form.Group>

                            {/* Место стоянки */}
                            <Form.Group className="mb-3">
                                <Form.Label>Место стоянки</Form.Label>
                                <Selector
                                    options={parkingOptions}
                                    selectedId={selectedParkingId}
                                    setSelectedId={setSelectedParkingId}
                                />
                            </Form.Group>

                            {/* Клиент ХФК-Биокон */}
                            <Form.Group className="mb-3" controlId="isOwnCompany">
                                <Form.Check label='Клиент ХФК-Биокон' name='isOwnCompany'
                                    defaultChecked={isOwnCompany}
                                    onChange={e => inputChangeHandler(e, setIsOwnCompany)}
                                />
                            </Form.Group>

                        </Col>

                    </Row>

                    <VehicleTypeDetailsProvider
                        moveDetails={moveDetails}
                        loading={photosLoading || weightLoading}
                    >

                        <Row>
                            <Col md={8}>
                                <Stack gap={2}>
                                    <div className="bg-light border">
                                        <div className="d-grid gap-2">
                                            <Button
                                                title='Получить данные с весов и камер'
                                                onClick={getWeightAndCameraData}
                                                withSpinner={true}
                                                loading={weightLoading || photosLoading}
                                                disableFlex={true}
                                            />
                                        </div>
                                    </div>
                                    <AppAlert show={photosError} title='Ошибка фото' text={photosError} clear={photosClearError} />
                                    <AppAlert show={weightError} title='Ошибка веса' text={weightError} clear={weightClearError} />
                                    <div className="bg-light border">
                                        {/* <VehicleDetails /> */}
                                        <VehicleTypeDetails />
                                    </div>

                                    {/* Комментарий */}
                                    <Form.Group>
                                        <Form.Control placeholder='Комментарий' as="textarea" rows={4} value={comment} onChange={(e) => inputChangeHandler(e, setComment)} />
                                    </Form.Group>

                                    <hr />

                                    <Stack direction='horizontal' gap='3'>
                                        <Button variant='outline-success' type='submit' title='Создать запись' withSpinner={true} loading={createLoading} />
                                        <Button variant='outline-danger' title='Отмена' className='ms-auto' clickHandler={() => navigate('/')} />
                                    </Stack>

                                </Stack>
                            </Col>
                            <Col md={4}>
                                <Photos mode='all' />
                            </Col>
                        </Row>

                    </VehicleTypeDetailsProvider>

                    {/* save alert */}
                    <AppAlert show={createIsError} title='Ошибка при создании записи' text={JSON.stringify(createError)} clear={createReset} />

                </Col>
            </Form>
        </Row>

    )
}

export default ArrivalPage