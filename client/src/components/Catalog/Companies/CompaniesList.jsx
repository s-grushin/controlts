import ItemsList from '../../../components/ItemsList/ItemsList'

const CompaniesList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'name', title: 'Наименование' },
        { id: 2, path: 'edrpou', title: 'ЕДРПОУ' },
        { id: 3, path: 'inn', title: 'ИНН' },
    ]

    return (
        <ItemsList
            fetchUrl='/companies'
            path='/catalog/companies'
            fields={fieldsDisplay}
        />
    )
}

export default CompaniesList