import { Table } from 'react-bootstrap'
import uuid from 'react-uuid'
import Topbar from './Topbar/Topbar'

const AppTable = ({ columns, data, onCellChanged, headStyles, ...props }) => {

    return (
        <>
            <Topbar />
            <Table bordered hover size="sm" {...props}>
                <thead style={headStyles}>
                    <tr>
                        {columns.map(item => (
                            <th
                                key={item.id}
                            >
                                {item.title}
                            </th>))}
                    </tr>
                </thead>
                <tbody>

                    {data.map(row => (
                        <tr
                            key={uuid()}
                        >
                            {row.map(cell => (
                                <td
                                    key={uuid()}
                                >
                                    {cell}
                                </td>))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

AppTable.defaultProps = {
    columns: [
        { id: 1, name: 'number', title: '#' },
        { id: 2, name: 'firstName', title: 'First Name' },
        { id: 3, name: 'lastName', title: 'Last Name' },
        { id: 4, name: 'username', title: 'Username' },
    ],
    data: [
        ['1', 'Mark', 'Otto', '@mdo'],
        ['2', 'Jacob', 'Thornton', '@fat'],
        ['3', 'Larry the Bird', 'Lorem, ipsum.', 'iusto aliquam'],
    ],
    headStyles: {}
}

export default AppTable