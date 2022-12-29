import { useState, useEffect } from 'react'
import useHttp from '../../hooks/useHttp'

const VehicleDetails = () => {

    const [rows, setRows] = useState([])

    const { request, loading } = useHttp()

    useEffect(() => {

        const fetchVehicleTypes = async () => {
            const res = await request('/vehicleTypes')
            console.log(res);
        }

        fetchVehicleTypes()

    }, [])


    return (
        <div>VehicleDetails</div>
    )
}

export default VehicleDetails