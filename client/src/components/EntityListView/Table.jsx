import React, { useContext } from 'react'
import Context from './Context'
import { Table as BTable } from 'react-bootstrap'
import classes from './Table.module.css'

const Table = () => {

    const context = useContext(Context)
    const [selectedEntities, setSelectedEntities] = context.state.selectedEntities


    const clickRowHandler = (id, event) => {

        const selectedRow = context.entities.find(entity => entity.id === id)
        setSelectedEntities([selectedRow])

    }

    const setRowClass = (entity) => {
        const isSelected = selectedEntities.find(selEntity => selEntity.id === entity.id)

        if (isSelected) {
            return classes.selectedRow
        }
    }

    return (
        < BTable responsive bordered hover size='sm' className={classes.entityTable}>
            < thead >
                <tr>
                    <th>№</th>
                    {context.columns.map(col => {
                        return <th key={col.id}>{col.name}</th>
                    })}
                </tr >
            </thead >
            <tbody>
                {
                    context.entities.map((entity, e_index) =>

                        <tr
                            className={setRowClass(entity)}
                            key={entity.name}
                            onClick={(event) => clickRowHandler(entity.id, event)}
                            onDoubleClick={(event) => context.table.handlers.openEntity(entity.id, event)}
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
        </BTable >
    )
}


export default Table