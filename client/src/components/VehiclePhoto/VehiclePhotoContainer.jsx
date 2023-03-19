import { useGetPhotoUrlQuery } from "redux/api/movesApi"
import VehiclePhoto from "./VehiclePhoto"
import Spinner from "components/Spinner"
import InputError from "components/InputError"

const VehiclePhotoContainer = ({ moveDetailId, number, isNew, photoUrl }) => {

    const { data, isFetching, isError, error } = useGetPhotoUrlQuery(moveDetailId, { skip: isNew || !moveDetailId })

    if (photoUrl) {
        return (
            <VehiclePhoto number={number} photoUrl={photoUrl} />
        )
    }

    if (isFetching) {
        return <Spinner />
    }

    if (isError) {
        <InputError errorText={`ошибка загрузки фото ${JSON.stringify(error)}`} />
    }

    return (
        <VehiclePhoto number={number} photoUrl={data} />
    )
}

export default VehiclePhotoContainer