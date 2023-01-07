import { useState, useEffect } from 'react'
import VehicleMovesList from '../../components/VehicleMovesList'
import VehicleMoveDetails from '../../components/VehicleMoveDetails'
import useHttp from '../../hooks/useHttp'
import Spinner from '../../components/Spinner'
import AppAlert from '../../components/AppAlert'

const Dashboard = () => {

    const [vehicleMoves, setVehicleMoves] = useState([])
    const [selectedMoveId, setSelectedMoveId] = useState(null)
    const { request, loading, error } = useHttp()

    useEffect(() => {

        const fetchVehicleMoves = async () => {
            const { rows } = await request('/vehicleMoves')
            if (rows) {
                setVehicleMoves(rows)
                if (rows.length > 0) setSelectedMoveId(rows[0].id)
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
            <div className="col-md-8 mt-1">
                <VehicleMovesList
                    selectedMoveId={selectedMoveId}
                    setSelectedMoveId={setSelectedMoveId}
                    vehicleMoves={vehicleMoves}
                />
            </div>
            <div className="col-md-4 mt-1">
                <VehicleMoveDetails move={vehicleMoves.find(move => move.id === selectedMoveId)} />
            </div>

        </div>
    )
}

export default Dashboard