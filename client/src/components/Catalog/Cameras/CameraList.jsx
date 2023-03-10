import ItemsList from "components/ItemsList/ItemsList"

const CameraList = () => {

    const fieldsDisplay = [
        { id: 1, name: 'name', title: 'Наименование' },
        { id: 2, name: 'photosPath', title: 'Путь к фотографиям (на сервере)' },
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