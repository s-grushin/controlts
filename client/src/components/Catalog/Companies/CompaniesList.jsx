import ItemsList from '../../../components/ItemsList/ItemsList'

const CompaniesList = () => {

    const fieldsDisplay = [
        { id: 1, name: 'name', title: 'Наименование' },
        { id: 2, name: 'edrpou', title: 'ЕДРПОУ' },
        { id: 3, name: 'inn', title: 'ИНН' },
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