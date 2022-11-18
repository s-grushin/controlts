import ItemsList from '../../ItemsList/ItemsList'

const CompaniesList = () => {

    const fieldsDisplay = [
        { id: 1, name: 'name', title: 'Наименование' }
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