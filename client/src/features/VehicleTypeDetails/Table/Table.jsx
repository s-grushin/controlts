import AppTable from "components/AppTable"
import { useVehicleTypeDetailsState, useVehicleTypeDetailsApi } from 'features/VehicleTypeDetails/ContextProvider'
import Spinner from 'components/Spinner'
import { Form } from 'react-bootstrap'

const Table = () => {

  const { state, readonly } = useVehicleTypeDetailsState()
  const dispatch = useVehicleTypeDetailsApi()

  const onChangeHandler = (e, id) => {
    dispatch({ type: 'edit', payload: { id, name: e.target.name, value: e.target.value } })
  }

  return (
    <>
      {
        state.status === 'loading' ?
          <div>
            <Spinner />
          </div>
          :
          <AppTable bordered>
            < thead >
              <tr>
                <th>Гос. номер</th>
                <th>Тип</th>
              </tr >
            </thead >

            <tbody>
              {
                state.items.map(row =>
                  <tr
                    key={row.id}
                    onClick={() => dispatch({ type: 'setSelectedId', payload: { id: row.id } })}
                    className={row.id === state.selectedId ? 'selectedTableRow' : ''}
                    style={{ cursor: 'pointer' }}
                  >

                    <td>
                      {
                        readonly ?
                          row.number
                          :
                          <Form.Control
                            name="number"
                            type="text"
                            disabled={readonly}
                            size='sm'
                            value={row.number}
                            onChange={e => onChangeHandler(e, row.id)}
                          />
                      }

                    </td>

                    <td>
                      {
                        readonly ?
                          state.vehicleTypes.find(item => item.id === row.vehicleTypeId).name
                          :
                          <Form.Select
                            name="vehicleTypeId"
                            size="sm"
                            disabled={readonly}
                            defaultValue={row.vehicleTypeId}
                            onChange={e => onChangeHandler(e, row.id)}
                          >
                            <option>--Выбрать тип--</option>
                            {
                              state.vehicleTypes.map(item =>
                                <option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.name}
                                </option>
                              )
                            }
                          </Form.Select>
                      }
                    </td>

                  </tr>
                )
              }
            </tbody>
          </AppTable>
      }

    </>
  )
}

export default Table