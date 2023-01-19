import Dashboard from './Dashboard'
import VehicleMovesProvider from '../../context/VehicleMovesProvider'


const DashboardWrapper = () => {
    return (
        <VehicleMovesProvider>
            <Dashboard />
        </VehicleMovesProvider>
    )
}

export default DashboardWrapper