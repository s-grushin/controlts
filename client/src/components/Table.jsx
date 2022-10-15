import { Table as BootstrapTable } from 'react-bootstrap'

const Table = ({ children, striped }) => {
    return (
        <BootstrapTable responsive bordered hover size='sm' striped={striped} style={{ cursor: 'pointer' }}>
            {children}
        </BootstrapTable>
    )
}

Table.defaultProps = {
    striped: false
}

export default Table