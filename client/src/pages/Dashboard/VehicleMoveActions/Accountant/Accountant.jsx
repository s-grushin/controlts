import ServiceTable from "./ServiceTable"
import { Card } from 'react-bootstrap'
import PayData from "./PayData/PayData"

const Accountant = () => {



    return (
        <Card style={{ fontSize: 13 }} className='p-2 mt-2'>
            <PayData />
            <ServiceTable />
        </Card>
    )
}

export default Accountant