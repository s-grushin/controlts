import React from 'react'
import { Table } from 'react-bootstrap'
import classes from './EntityTable.module.css'

const EntityTable = ({ entities, columns, state }) => {

    const [selectedEntities, setSelectedEntities] = state.selectedEntities


    const clickRowHandler = (id) => {

        const isAlreadySelected = selectedEntities.find(entity => entity.id === id)
        if (isAlreadySelected) {
            const filtered = selectedEntities.filter(selEntity => selEntity.id !== id)
            setSelectedEntities(filtered)
        } else {
            const selectedRow = entities.find(entity => entity.id === id)
            setSelectedEntities([...selectedEntities, selectedRow])
        }

    }

    const setRowClass = (entity) => {
        const isSelected = selectedEntities.find(selEntity => selEntity.id === entity.id)

        if (isSelected) {
            return classes.selectedRow
        }
    }

    return (
        < Table responsive bordered hover size='sm' className={classes.entityTable}>
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
                            className={setRowClass(entity)}
                            key={entity.name}
                            onClick={() => clickRowHandler(entity.id)}
                        >
                            <td key={e_index}>{e_index + 1}</td>
                            {
                                Object.keys(entity).map((key, k_index) => {
                                    if (key === 'id') {
                                        return null
                                    }
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