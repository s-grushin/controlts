import PrintPass from "pages/ArrivalPage/PrintForms/Pass/PrintPass"
import { Stack } from "react-bootstrap"
import useMovesHelper from 'pages/Dashboard/VehicleMovesList/hooks/useMovesHelper'

const MoveCommands = () => {

    const { selectedMove } = useMovesHelper()

    return (
        <Stack className='mb-1' direction='horizontal' gap={2}>
            <PrintPass moveId={selectedMove?.id} />
        </Stack>
    )
}

export default MoveCommands