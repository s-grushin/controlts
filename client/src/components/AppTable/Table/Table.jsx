import { Table as BTable } from 'react-bootstrap'
import useAppTable from '../useAppTable'
import styles from './Table.module.css'


const Table = () => {

  const { contextValue } = useAppTable()
  const columns = contextValue.columns
  const items = contextValue.state.items
  const selectedId = contextValue.state.selectedId
  const dispatch = contextValue.dispatch

  return (
    <BTable striped bordered hover size="sm">
      <thead className={styles.header}>
        <tr>
          {columns.map(col => <th key={col.name}>{col.title}</th>)}
        </tr>
      </thead>
      <tbody>

        {
          items.map(row =>

            <tr
              key={row.id}
              onClick={() => dispatch({ type: 'setSelectedItem', payload: row.id })}
              className={`${styles.row} ${row.id === selectedId ? 'selectedTableRow' : ''}`}
            >
              {
                row.cells.map((cell, index) => {
                  return <td key={columns[index].name}>{cell.title}</td>
                })
              }
            </tr>)
        }

      </tbody>
    </BTable >
  )
}

export default Table