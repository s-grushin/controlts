import ItemsList from "components/ItemsList/ItemsList"

const CameraList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'name', title: 'Наименование' },
        { id: 2, path: 'photoPath', title: 'Путь к фотографиям (на сервере)' },
    ]

    return (
        <ItemsList
            fetchUrl='/cameras'
            path='/catalog/cameras'
            fields={fieldsDisplay}
        />
    )
}

export default CameraList