import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ItemsList from '../ItemsList/ItemsList'

const OneToManyList = ({ oneOptions, manyOptions }) => {

    const [selectedOneId, setSelectedOneId] = useState(null)

    const { oneTitle, oneFields, oneFetchUrl, onePath } = oneOptions
    const { manyTitle, manyFields, manyFetchUrl, manyPath, fkName } = manyOptions


    return (
        <Row>
            <Col sm={4}>
                <b>{oneTitle}</b>
                <hr />
                <ItemsList
                    fetchUrl={oneFetchUrl}
                    path={onePath}
                    fields={oneFields}
                    relationType='one'
                    setSelectedOneId={setSelectedOneId}
                />
            </Col>
            <Col sm={8} className=''>
                <b>{manyTitle}</b>
                <hr />
                <ItemsList
                    fetchUrl={manyFetchUrl}
                    path={manyPath}
                    fields={manyFields}
                    showButtonBack={false}
                    relationType='many'
                    fkName={fkName}
                    selectedOneId={selectedOneId}
                />
            </Col>
        </Row>

    )
}

export default OneToManyList