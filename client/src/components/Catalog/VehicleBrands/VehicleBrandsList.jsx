import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ItemsList from '../../../components/ItemsList/ItemsList'

const VehicleBrandsList = () => {

    const [ownerId, setOwnerId] = useState(null)

    const fieldsDisplayBrands = [
        { id: 1, name: 'name', title: 'Наименование' }
    ]

    const ownerSelectedHandler = (id) => {
        setOwnerId(id)
    }

    return (
        <Row>
            <Col sm={4}>
                <b>Марки</b>
                <hr />
                <ItemsList
                    fetchUrl='/vehicle/brands'
                    path='/catalog/vehicleBrands'
                    fields={fieldsDisplayBrands}
                    assosiation={{ ownerSelectedHandler }}
                />
            </Col>
            <Col sm={8} className=''>
                <b>Модели</b>
                <hr />
                <ItemsList
                    fetchUrl='/vehicle/models'
                    path='/catalog/vehicleBrands'
                    fields={fieldsDisplayBrands}
                    assosiation={{ ownerId, fkName: 'brandId' }}
                    showButtonBack={false}
                />
            </Col>
        </Row>

    )
}

export default VehicleBrandsList