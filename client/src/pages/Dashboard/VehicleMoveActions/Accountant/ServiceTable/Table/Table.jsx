import { useState, useEffect, useContext } from 'react'
import AppTable from "../../../../../../components/AppTable"
import useHttp from '../../../../../../hooks/useHttp'
import './Table.module.css'
import useAccountantContext from '../../hooks/useAccountantContext'
import { VehicleMovesContext } from '../../../../VehicleMovesList/context/VehicleMovesProvider'

const Table = () => {

    const [allServices, setAllServices] = useState([])
    const { request, loading, error } = useHttp()
    const vmContext = useContext(VehicleMovesContext)

    const { contextValue } = useAccountantContext()
    const { state, dispatch } = contextValue

    useEffect(() => {

        const fetchAllServices = async () => {
            const data = await request('/services')
            setAllServices(data?.rows)
        }

        fetchAllServices()

    }, [request])


    useEffect(() => {

        const vmServices = vmContext.state.items.find(item => item.id === vmContext.state.selectedId)?.services
        if (vmServices) {

            const mappedService = vmServices.map(item => {
                return {
                    id: item.id,
                    serviceId: item.serviceId,
                    quantity: item.quantity,
                    price: item.price,
                    summ: item.summ
                }
            })

            dispatch({ type: 'addServicesBulk', payload: mappedService })
        }

    }, [vmContext.state.selectedId, vmContext.state.items, dispatch])


    const onChangeHandler = (e, rowId) => {

        if (e.target.name === 'serviceId') {
            //достаем цену услуги
            const price = allServices.find(item => item.id === parseInt(e.target.value))?.price || 0
            dispatch({ type: 'editService', payload: { rowId, key: 'price', value: price } })
        }

        dispatch({ type: 'editService', payload: { rowId, key: e.target.name, value: e.target.value } })
        dispatch({ type: 'setServicesModified', payload: true })
    }

    return (
        <>
            {
                loading ? 'Загрузка...' : error ? `ошибка загрузки ${error}` :
                    <AppTable style={{ fontSize: '12px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Наименование</th>
                                <th scope="col">Количество</th>
                                <th scope="col">Цена(без НДС)</th>
                                <th scope="col">Сумма(без НДС)</th>
                            </tr>
                        </thead>
                        {
                            <tbody>
                                {
                                    state.services.map(row => (
                                        <tr
                                            key={row.id}
                                            onClick={() => dispatch({ type: 'setSelectedServiceId', payload: row.id })}
                                            className={row.id === state.selectedServiceId ? 'selectedTableRow' : ''}
                                        >

                                            <td>
                                                <select
                                                    name="serviceId"
                                                    defaultValue={row.serviceId}
                                                    onChange={e => onChangeHandler(e, row.id)}
                                                >
                                                    <option value="0">--Выбрать услугу--</option>
                                                    {
                                                        allServices.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                                    }
                                                </select>
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    name='quantity'
                                                    value={row.quantity}
                                                    onChange={e => onChangeHandler(e, row.id)}
                                                />
                                            </td>

                                            <td>
                                                {row.price}
                                                {/* <input type="number"
                                                    name='price'
                                                    value={row.price}
                                                    onChange={e => onChangeHandler(e, row.id)}
                                                /> */}
                                            </td>

                                            <td>
                                                {row.summ}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        }
                    </AppTable>
            }
        </>
    )
}

export default Table