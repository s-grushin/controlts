import Dashboard from './Dashboard'
import VehicleMovesProvider from './VehicleMovesList/context/VehicleMovesProvider'


const DashboardWrapper = () => {
    return (
        <VehicleMovesProvider>
            <Dashboard />
        </VehicleMovesProvider>
    )
}

export default DashboardWrapper