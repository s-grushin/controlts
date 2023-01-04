import VehicleMovesList from '../components/VehicleMovesList'
import VehicleMoveDetails from '../components/VehicleMoveDetails'

const WorkPage = () => {

  const [selectedItemId, setSelectedItemId] = useState(null)

  return (
    <div className="row">
      <div className="col-md-7 mt-1">
        <VehicleMovesList
          selectedId={selectedItemId}
          setSelectedId={setSelectedItemId}
        />
      </div>
      <div className="col-md-5 mt-1">
        <VehicleMoveDetails />
      </div>

    </div>
  )
}

export default WorkPage