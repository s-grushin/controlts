import { Stack } from 'react-bootstrap'
import AppButton from '../../AppButton'
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'

const Topbar = () => {
    return (
        <Stack direction='horizontal' gap={2} className='p-1'>
            <AppButton variant='outline-success'>
                <PlusCircle />
            </AppButton>
            <AppButton variant='outline-danger'>
                <DashCircle />
            </AppButton>
        </Stack>
    )
}

export default Topbar