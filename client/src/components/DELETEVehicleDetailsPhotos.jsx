import { Stack } from "react-bootstrap"
import VehiclePhoto from './VehiclePhoto'

const VehicleDetailsPhotos = ({ vehicleDetails }) => {
    return (
        <Stack direction="horizontal" gap={2}>
            {vehicleDetails.map(item => (
                <VehiclePhoto
                    key={item.id}
                    number={item.number}
                    photoUrl={item.photo}
                />
            ))}
        </Stack>
    )
}

export default VehicleDetailsPhotos