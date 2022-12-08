import { Table as BootstrapTable } from 'react-bootstrap'

const Table = ({ children, striped, ...props }) => {
    return (
        <BootstrapTable responsive bordered hover size='sm' striped={striped} style={{ cursor: 'pointer' }} {...props}>
            {children}
        </BootstrapTable>
    )
}

Table.defaultProps = {
    striped: false
}

export default Table