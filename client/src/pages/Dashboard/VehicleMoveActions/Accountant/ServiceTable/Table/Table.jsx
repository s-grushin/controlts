import { useState, useEffect } from 'react'
import AppTable from "../../../../../../components/AppTable"
import useHttp from '../../../../../../hooks/useHttp'
import './Table.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedId, editService } from '../../../../../../redux/slices/vehicleMoveServicesSlice'

const Table = () => {

    const [allServices, setAllServices] = useState([])
    const { request, loading, error } = useHttp()

    const vehicleMoveServices = useSelector(state => state.vehicleMoveServices)
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchAllServices = async () => {
            const data = await request('/services')
            setAllServices(data?.rows)
        }

        fetchAllServices()

    }, [request])

    const onChangeHandler = (e, serviceId) => {

        if (e.target.name === 'serviceId') {
            //достаем цену услуги
            const price = allServices.find(item => item.id === parseInt(e.target.value))?.price || 0
            dispatch(editService({ id: serviceId, key: 'price', value: price }))
        }

        dispatch(editService({ id: serviceId, key: e.target.name, value: e.target.value }))
    }

    return (
        <>
            {
                loading ? 'Загрузка...' : error ? `ошибка загрузки ${error}` :
                    <AppTable style={{ fontSize: '12px' }} bordered>
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
                                    vehicleMoveServices.items.map(row => (
                                        <tr
                                            onClick={() => dispatch(setSelectedId({ id: row.id }))}
                                            key={row.id}
                                            className={row.id === vehicleMoveServices.selectedId ? 'selectedTableRow' : ''}
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