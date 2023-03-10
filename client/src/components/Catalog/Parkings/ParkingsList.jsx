import ItemsList from '../../ItemsList/ItemsList'

const ParkingsList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'name', title: 'Наименование' },
        { id: 2, path: 'isBusy', title: 'Занято' },
    ]

    return (
        <ItemsList
            fetchUrl='/parkings'
            path='/catalog/parkings'
            fields={fieldsDisplay}
        />
    )
}

export default ParkingsList