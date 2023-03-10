import OneToManyList from '../../OneToManyList/OneToManyList'

const VehicleBrandsList = () => {

    const oneOptions = {
        oneTitle: 'Марки',
        oneFields: [
            { id: 1, path: 'name', title: 'Наименование' }
        ],
        oneFetchUrl: '/vehicle/brands',
        onePath: '/catalog/vehicleBrands'
    }

    const manyOptions = {
        manyTitle: 'Модели',
        manyFields: [
            { id: 1, path: 'name', title: 'Наименование' },
            { id: 2, path: 'weight', title: 'Грузоподъемность' },
            { id: 3, path: 'isTruck', title: 'Грузовой' }
        ],
        manyFetchUrl: '/vehicle/models',
        manyPath: '/catalog/vehicleBrands/models',
        fkName: 'brandId'
    }

    return (
        <OneToManyList
            oneOptions={oneOptions}
            manyOptions={manyOptions}
        />
    )
}

export default VehicleBrandsList