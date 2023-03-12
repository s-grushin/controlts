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
                state.items.map(item =>
                  <tr
                    key={item.id}
                    onClick={() => dispatch({ type: 'setSelectedId', payload: { id: item.id } })}
                    className={item.id === state.selectedId ? 'selectedTableRow' : ''}
                    style={{ cursor: 'pointer' }}
                  >

                    <td>
                      {
                        readonly ?
                          item.number
                          :
                          <Form.Control
                            name="number"
                            type="text"
                            disabled={readonly}
                            size='sm'
                            value={item.number}
                            onChange={e => onChangeHandler(e, item.id)}
                          />
                      }
                    </td>

                    <td>
                      {
                        readonly ?
                          state.vehicleTypes.find(vt => vt.id === item.vehicleTypeId).name
                          :
                          <Form.Select
                            name="vehicleTypeId"
                            size="sm"
                            disabled={readonly}
                            defaultValue={item.vehicleTypeId}
                            onChange={e => onChangeHandler(e, item.id)}
                          >
                            <option>--Выбрать тип--</option>
                            {
                              state.vehicleTypes.map(vt =>
                                <option
                                  key={vt.id}
                                  value={vt.id}
                                >
                                  {vt.name}
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