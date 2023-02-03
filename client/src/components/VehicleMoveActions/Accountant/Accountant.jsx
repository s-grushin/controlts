import { useState, useEffect, useContext, useMemo } from "react"
import AppTable from "../../AppTable/AppTable"
import useHttp from '../../../hooks/useHttp'
import { calculateDiffBwDates } from '../../../utils/common'
import { VehicleMovesContext } from '../../../context/VehicleMovesProvider'


const Accountant = () => {

    const [services, setServices] = useState([])
    const { request } = useHttp()
    const { state } = useContext(VehicleMovesContext)

    console.log(state);

    const columns = [
        { id: 1, name: 'name', title: 'Наименование' },
        { id: 2, name: 'quantity', title: 'Количество' },
        { id: 3, name: 'price', title: 'Цена (без НДС)' },
        { id: 4, name: 'summ', title: 'Сумма (без НДС)' },
    ]

    const parkedDays = useMemo(() => {
        if (!state.selectedId) {
            return null
        }

        const vm = state.items.find(item => item.id === state.selectedId)
        return calculateDiffBwDates(new Date(vm.dateIn))

    }, [state.selectedId, state.items])

    console.log(parkedDays);

    const tableData = services.map(item =>
        [
            item.name,
            1,
            item.price,
            2 * item.price
        ])

    useEffect(() => {

        const fetchStartingServices = async () => {
            const data = await request('/vehicleMoves/getStartingServices')
            setServices(data)
        }

        fetchStartingServices()

    }, [request])


    return (
        <AppTable columns={columns} data={tableData} headStyles={{ fontSize: 12 }} />

    )
}

export default Accountant