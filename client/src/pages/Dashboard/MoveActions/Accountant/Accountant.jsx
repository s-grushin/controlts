import { Card } from 'react-bootstrap'
import Services from './Services'
import PayData from "./PayData/PayData"

const Accountant = () => {



    return (
        <Card style={{ fontSize: 13 }} className='p-2 mt-2'>
            <PayData />
            <Services />
        </Card>
    )
}

export default Accountant