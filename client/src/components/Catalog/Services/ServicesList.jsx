import ItemsList from '../../../components/ItemsList/ItemsList'

const ServicesList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'name', title: 'Наименование' },
        { id: 2, path: 'price', title: 'Цена' },
    ]

    return (
        <ItemsList
            fetchUrl='/services'
            path='/catalog/services'
            fields={fieldsDisplay}
        />
    )
}

export default ServicesList