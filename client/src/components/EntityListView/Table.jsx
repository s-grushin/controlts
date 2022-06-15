import React, { useContext } from 'react'
import Context from './Context'
import { Table as BTable } from 'react-bootstrap'
import classes from './Table.module.css'
import { BsCheck } from 'react-icons/bs'

const Table = () => {

    const context = useContext(Context)
    const selectedEntities = context.state.selectedEntities
    const setSelectedEntities = context.state.setSelectedEntities


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
                            onDoubleClick={(event) => context.handlers.editEntity(entity.id, event)}
                        >
                            <td key={entity.id}>{index + 1}</td>
                            {
                                context.columns.map(col => {
                                    return (
                                        <td key={`${entity.id}${col.id}`}>
                                            {
                                                entity[col.name] === true ? <BsCheck /> : entity[col.name]
                                            }
                                        </td>
                                    )
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