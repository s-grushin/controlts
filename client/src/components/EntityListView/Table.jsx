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
                        return <th key={col.id}>{col.title}</th>
                    })}
                </tr >
            </thead >
            <tbody>
                {
                    context.entities.map((entity, index) =>

                        <tr
                            className={setRowClass(entity)}
                            key={entity.id}
                            onClick={(event) => clickRowHandler(entity.id, event)}
                            onDoubleClick={(event) => context.table.handlers.openEntity(entity.id, event)}
                        >
                            <td key={entity.id}>{index + 1}</td>
                            {
                                context.columns.map(col => {
                                    return <td key={`${entity.id}${col.id}`}>{entity[col.name]}</td>
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