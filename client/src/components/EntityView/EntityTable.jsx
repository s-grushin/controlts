import React from 'react'
import { Table } from 'react-bootstrap'

const EntityTable = ({ entities, columns }) => {

    return (
        < Table responsive bordered hover size='sm' >
            < thead >
                <tr>
                    <th>№</th>
                    {columns.map(col => {
                        return <th key={col.id}>{col.name}</th>
                    })}
                </tr >
            </thead >
            <tbody>
                {
                    entities.map((entity, e_index) =>

                        <tr
                            key={entity.name}
                            style={{ cursor: 'pointer' }}
                        >
                            <td key={e_index}>{e_index + 1}</td>
                            {
                                Object.keys(entity).map((key, k_index) => {
                                    return <td key={k_index}>{entity[key]}</td>
                                })
                            }
                        </tr>
                    )

                }
            </tbody>
        </Table >
    )
}


export default EntityTable