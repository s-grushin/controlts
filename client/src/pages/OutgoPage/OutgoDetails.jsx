import GetPhotosAndWeight from "../../features/GetPhotosAndWeight/GetPhotosAndWeight"


const OutgoDetails = ({ vehicleMove, loading, error }) => {
    return (
        // <Card>
        //     {
        //         loading ? <Spinner /> : error ? `ошибка загрузки: ${error}` :
        //             <Card.Body>
        //                 <Card.Title className='fs-6'>Данные при выезде</Card.Title>
        //                 <VehicleDetailsProvider>
        //                     <VehicleDetails />
        //                 </VehicleDetailsProvider>
        //             </Card.Body>
        //     }

        // </Card>
        <GetPhotosAndWeight vehicleMove={vehicleMove} />
    )
}

export default OutgoDetails