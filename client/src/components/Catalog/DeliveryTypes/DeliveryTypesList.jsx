import ItemsList from '../../ItemsList/ItemsList'

const DeliveryTypesList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'name', title: 'Наименование' },
    ]

    return (
        <ItemsList
            fetchUrl='/deliveryTypes'
            path='/catalog/deliveryTypes'
            fields={fieldsDisplay}
        />
    )
}

export default DeliveryTypesList