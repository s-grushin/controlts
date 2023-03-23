import AppTable from 'components/AppTable'
import './Table.module.css'
import { useMoveServicesState, useMoveServicesApi } from '../MoveServicesProvider'

const Table = () => {

    const error = null
    const loading = false

    const { state, readonly } = useMoveServicesState()
    const { dispatch } = useMoveServicesApi()

    const onChangeHandler = (e, itemId) => {


        if (e.target.name === 'serviceId') {
            //достаем цену услуги
            const price = state.allServices.find(item => item.id === parseInt(e.target.value))?.price || 0
            dispatch({ type: 'editItem', payload: { itemId, key: 'price', value: price } })
        }

        dispatch({ type: 'editItem', payload: { itemId, key: e.target.name, value: e.target.value } })
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
                                    state.items.map(item => (
                                        <tr
                                            onClick={() => dispatch({ type: 'setSelectedId', payload: { id: item.id } })}
                                            key={item.id}
                                            className={item.id === state.selectedId ? 'selectedTableRow' : ''}
                                        >

                                            <td>
                                                <select
                                                    name="serviceId"
                                                    value={item.serviceId}
                                                    onChange={e => onChangeHandler(e, item.id)}
                                                    disabled={readonly}
                                                >
                                                    <option value="0">--Выбрать услугу--</option>
                                                    {
                                                        state.allServices.map(service => <option key={service.id} value={service.id}>{service.name}</option>)
                                                    }
                                                </select>
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    name='quantity'
                                                    value={item.quantity}
                                                    onChange={e => onChangeHandler(e, item.id)}
                                                    disabled={readonly}
                                                />
                                            </td>

                                            <td>
                                                {item.price}
                                            </td>

                                            <td>
                                                {item.summ}
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