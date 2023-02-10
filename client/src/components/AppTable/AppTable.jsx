import { Table } from 'react-bootstrap'


const AppTable = ({ children, ...props }) => {
    return (
        <Table size='sm' {...props}>
            {children}
        </Table>
    )
}

AppTable.defaultProps = {

}

export default AppTable