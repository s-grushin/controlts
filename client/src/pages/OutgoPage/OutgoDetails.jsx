import { Card, Row, Col } from 'react-bootstrap'
import Photos from 'features/VehicleTypeDetails/Photos'
import VehicleTypeDetailsProvider from 'features/VehicleTypeDetails/ContextProvider'
import VehicleTypeDetails from 'features/VehicleTypeDetails'
import Button from 'components/AppButton'
import useGetWeight from 'features/Weight/useGetWeight'
import useGetPhotos from 'features/VehicleTypeDetails/Photos/useGetPhotos'
import AppAlert from 'components/AppAlert'
import InputGroup from 'components/InputGroup'
import Checkbox from 'components/FormControls/Checkbox/Checkbox'
import { mapCameraDataToMoveDetails } from 'features/VehicleTypeDetails/helpers'
import { useEffect } from 'react'



const OutgoDetails = ({ move, weightOptions, cameraDataOptions, outgoPhotoDetailsIsDiffState }) => {

    const { weight, setWeight } = weightOptions
    const { cameraData, setCameraData } = cameraDataOptions
    const { outgoPhotoDetailsIsDiff, setOutgoPhotoDetailsIsDiff } = outgoPhotoDetailsIsDiffState


    const { getPhotos, loading: photosLoading, error: errorPhoto, clearError: clearPhotoError } = useGetPhotos()
    const { getWeight, loading: weightLoading, error: errorWeight, clearError: clearWeightError } = useGetWeight()


    const handleGetWeight = async () => {
        const weightData = await getWeight()
        setWeight(weightData.value)
    }

    const handleGetPhotos = async () => {
        const cameraData = await getPhotos()
        setCameraData(cameraData)
    }

    const clearError = () => {
        clearPhotoError()
        clearWeightError()
    }

    const moveDetails = cameraData?.length > 0 ? mapCameraDataToMoveDetails(cameraData) : move.vehicleDetails

    useEffect(() => {
        //по умолчанию вес установим как при въезде
        setWeight(move.weightIn)
    }, [move.weightIn, setWeight])


    return (
        < Card >
            <Row>
                <VehicleTypeDetailsProvider moveDetails={moveDetails} readonly={!outgoPhotoDetailsIsDiff}>
                    <Col>
                        <Row>
                            <Col>
                                <InputGroup className='m-1' readOnly={false} name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} title='Вес' />
                            </Col>

                            <Col>
                                <Button
                                    onClick={handleGetWeight}
                                    className='m-1'
                                    disabled={weightLoading}
                                >
                                    Получить вес
                                </Button>
                            </Col>
                        </Row>

                        <Checkbox labelText='фотографии отличаются от въезда' value={outgoPhotoDetailsIsDiff} onChange={setOutgoPhotoDetailsIsDiff} />
                        <Button
                            onClick={handleGetPhotos}
                            className='m-1'
                            disabled={photosLoading || !outgoPhotoDetailsIsDiff}
                        >
                            Получить фотографии с камер
                        </Button>
                        <AppAlert show={errorPhoto || errorWeight} text={errorPhoto || errorWeight} clear={clearError} title='ошибка' />
                        <VehicleTypeDetails />
                    </Col>
                    <Col>
                        <Photos mode='all' />
                    </Col>
                </VehicleTypeDetailsProvider>

            </Row>
        </ Card >
    )
}

export default OutgoDetails