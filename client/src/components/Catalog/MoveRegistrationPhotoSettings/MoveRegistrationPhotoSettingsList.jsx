import ItemsList from "components/ItemsList/ItemsList"

const MoveRegistrationPhotoSettingsList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'camera.name', title: 'Камера' },
        { id: 2, path: 'vehicleType.name', title: 'Тип автотранспорта' },
        { id: 3, path: 'order', title: 'Сортировка' },
    ]

    return (
        <ItemsList
            fetchUrl='/moveRegistrationPhotoSettings'
            path='/catalog/moveRegistrationPhotoSettings'
            fields={fieldsDisplay}
        />
    )
}

export default MoveRegistrationPhotoSettingsList