import { Card, Row, Col } from 'react-bootstrap'
import Photos from 'features/VehicleTypeDetails/Photos'
import VehicleTypeDetailsProvider from 'features/VehicleTypeDetails/ContextProvider'
import VehicleTypeDetails from 'features/VehicleTypeDetails'
import Button from 'components/AppButton'
import useGetWeight from 'features/Weight/useGetWeight'
import useGetPhotos from 'features/VehicleTypeDetails/Photos/useGetPhotos'
import AppAlert from 'components/AppAlert'
import InputGroup from 'components/InputGroup'



const OutgoDetails = ({ weightOptions, cameraDataOptions }) => {

    const { weight, setWeight } = weightOptions
    const { cameraData, setCameraData } = cameraDataOptions

    const { getPhotos, loading: photosLoading, error: errorPhoto, clearError: clearPhotoError } = useGetPhotos()
    const { getWeight, loading: weightLoading, error: errorWeight, clearError: clearWeightError } = useGetWeight()

    const getWeightAndCameraData = async () => {

        const [photosData, weightData] = await Promise.all([getPhotos(), getWeight()])
        const camera = photosData?.cameraData
        const weight = weightData?.weight
        setCameraData(camera)
        setWeight(weight)

    }

    const clearError = () => {
        clearPhotoError()
        clearWeightError()
    }

    return (

        <VehicleTypeDetailsProvider isNew={true} cameraData={cameraData}>
            < Card >
                <Row>
                    <Col>
                        <AppAlert show={errorPhoto || errorWeight} text={errorPhoto || errorWeight} clear={clearError} title='ошибка' />
                        <Button
                            onClick={getWeightAndCameraData}
                            className='m-1'
                            disabled={weightLoading || photosLoading}
                        >
                            Получить данные с весов и камер
                        </Button>
                        <InputGroup readOnly={false} name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} title='Вес' />
                        <VehicleTypeDetails />
                    </Col>
                    <Col>
                        <Photos mode='all' />
                    </Col>
                </Row>
            </ Card>
        </VehicleTypeDetailsProvider>

    )
}

export default OutgoDetails