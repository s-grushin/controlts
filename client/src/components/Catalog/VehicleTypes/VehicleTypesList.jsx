import ItemsList from '../../ItemsList/ItemsList'

const CompaniesList = () => {

    const fieldsDisplay = [
        { id: 1, name: 'name', title: 'Наименование' },
        { id: 2, name: 'orderInCheckout', title: 'Порядок при оформлении пропуска' },
    ]

    return (
        <ItemsList
            fetchUrl='/vehicleTypes'
            path='/catalog/vehicleTypes'
            fields={fieldsDisplay}
        />
    )
}

export default CompaniesList