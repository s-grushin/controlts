import AppToolbar from 'components/AppTable/Toolbar'
import { useVehicleTypeDetailsState, useVehicleTypeDetailsApi } from 'features/VehicleTypeDetails/ContextProvider'


const Topbar = () => {

  const { readonly } = useVehicleTypeDetailsState()
  const dispatch = useVehicleTypeDetailsApi()

  const handlers = {
    add: () => dispatch({ type: 'add' }),
    deleteOne: () => dispatch({ type: 'delete' }),
  }

  const disabledBtn = {
    addDisabled: false,
    deleteOneDisabled: false,
  }

  if (readonly) {
    return null
  }

  return (
    <AppToolbar handlers={handlers} disabledBtn={disabledBtn} />
  )
}

export default Topbar