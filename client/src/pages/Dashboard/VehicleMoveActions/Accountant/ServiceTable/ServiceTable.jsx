import Toolbar from './Toolbar'
import Table from './Table'
import { useState } from 'react'

const ServiceTable = () => {

    const [selectedId, setSelectedId] = useState(null)

    return (
        <>
            <Toolbar selectedId={selectedId} />
            <Table onRowSelected={(id) => setSelectedId(id)} />
        </>
    )
}

export default ServiceTable