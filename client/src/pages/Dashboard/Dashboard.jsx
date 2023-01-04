import { useState, useEffect } from 'react'
import VehicleMovesList from '../../components/VehicleMovesList'
import VehicleMoveDetails from '../../components/VehicleMoveDetails'
import useHttp from '../../hooks/useHttp'
import Spinner from '../../components/Spinner'
import AppAlert from '../../components/AppAlert'

const Dashboard = () => {

    const [vehicleMoves, setVehicleMoves] = useState([])
    const [selectedItemId, setSelectedItemId] = useState(null)
    const { request, loading, error } = useHttp()

    useEffect(() => {

        const fetchVehicleMoves = async () => {
            const { rows } = await request('/vehicleMoves')
            console.log(rows);
            if (rows) {
                setVehicleMoves(rows)
            }
        }

        fetchVehicleMoves()

    }, [request])


    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <AppAlert
            show={error}
            text={`Ошибка загрузки списка. ${error}`}
        />
    }


    return (
        <div className="row">
            <div className="col-md-7 mt-1">
                <VehicleMovesList
                    selectedId={selectedItemId}
                    setSelectedId={setSelectedItemId}
                    vehicleMoves={vehicleMoves}
                />
            </div>
            <div className="col-md-5 mt-1">
                <VehicleMoveDetails />
            </div>

        </div>
    )
}

export default Dashboard