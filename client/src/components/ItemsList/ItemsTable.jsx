import Table from '../Table'
import { Check } from 'react-bootstrap-icons'
import { getObjectValueByPath } from 'utils/common';

const ItemsTable = ({ fields, items, selected, currentPage, itemsQtyOnPage }) => {

    //console.log(fields);
    //console.log(items);
    //console.log();

    const { selectedItemId, selectRowHandler } = selected

    return (
        <Table>
            < thead >
                <tr>
                    <th>№</th>
                    {fields.map(field => {
                        return <th key={field.id}>{field.title}</th>
                    })}
                </tr >
            </thead >
            <tbody>
                {
                    items.map((item, index) =>

                        <tr
                            key={item.id}
                            onClick={() => selectRowHandler(item.id)}
                            className={item.id === selectedItemId ? 'selectedTableRow' : null}
                        >
                            <td key={item.id}>{index + 1 + itemsQtyOnPage * (currentPage - 1)}</td>
                            {
                                fields.map(field => {
                                    return (
                                        <td key={`${item.id}${field.id}`}>
                                            {
                                                getObjectValueByPath(item, field.path)[0] === true ? <Check /> : getObjectValueByPath(item, field.path)[0]
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )

                }
            </tbody>
        </Table>
    )
}

export default ItemsTable