import { useContext } from 'react'
import AppTable from "../../../AppTable"
import { Column, Cell, Row } from '../../../AppTable/Table/classes'
import { VehicleMovesContext } from '../../../../context/VehicleMovesProvider'


const columns = [
    new Column('name', 'Наименование'),
    new Column('quantity', 'Количество'),
    new Column('price', 'Цена (без НДС)'),
    new Column('summ', 'Сумма (без НДС)'),
]

const prepareTableItems = (services) => {

    if (!services) {
        return []
    }

    return services.map(item =>

        new Row(
            new Cell(item.service.id, item.service.name),
            new Cell(item.quantity, item.quantity),
            new Cell(item.price, item.price),
            new Cell(item.summ, item.summ),
        )
    )
}

const ServiceTable = () => {

    const { state } = useContext(VehicleMovesContext)
    const services = state.items.find(item => item.id === state.selectedId)?.services

    return (
        <>

            <AppTable
                columns={columns}
                initItems={prepareTableItems(services)}
            />

        </>
    )
}

export default ServiceTable