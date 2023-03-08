import { createSlice } from '@reduxjs/toolkit'
import { subtractFromDate, today } from 'utils/common'


export const availableFilters = {
    movesIn: [
        { id: 1, name: 'All', title: 'Все', getValue: () => '' },
        { id: 2, name: 'onTerritory', title: 'На территории', getValue: () => true },
        { id: 3, name: 'dateIn', title: 'За сегодня', getValue: () => today().toISOString() },
        { id: 4, name: 'dateIn', title: 'За последние 2 дня', getValue: () => subtractFromDate(today(), { ms: 1000 * 60 * 60 * 24 * 2 }).toISOString() },
        { id: 5, name: 'dateIn', title: 'За последние 7 дней', getValue: () => subtractFromDate(today(), { ms: 1000 * 60 * 60 * 24 * 7 }).toISOString() },
        { id: 6, name: 'dateIn', title: 'За последний месяц', getValue: () => subtractFromDate(today(), { ms: 1000 * 60 * 60 * 24 * 31 }).toISOString() },
        { id: 7, name: 'dateIn', title: 'За последний год', getValue: () => subtractFromDate(today(), { ms: 1000 * 60 * 60 * 24 * 365 }).toISOString() },
        { id: 8, name: 'dateInRange', title: 'За выбранный период', getValue: (from, to) => ({ from: from.toISOString(), to: to.toISOString() }) },
    ]
}

export const getFilterById = (name, id) => availableFilters[name].find(item => item.id === id)

export const prepareFiltersForQuery = (filters) => {
    if (!filters) {
        return
    }

    let result = {}

    for (const key in filters) {
        const filter = getFilterById(key, filters[key].id)
        const value = filters[key].value


        if (filter.name === 'dateInRange') {
            result[filter.name] = `${value.from}to${value.to}`

        } else if (filter.name === 'All') {
            continue
        } else {
            result[filter.name] = value
        }
    }

    return result
}

const movesInfo = createSlice({
    name: 'movesInfo',
    initialState: {
        selectedId: null,
        pagination: { currentPage: 1 },
        filters: {
            movesIn: { id: 1, value: availableFilters.movesIn.find(item => item.id === 1).getValue() }
        }
    },
    reducers: {
        setSelectedId(state, action) {
            state.selectedId = action.payload.id
        },
        setPagination(state, action) {
            const { currentPage } = action.payload
            state.pagination.currentPage = currentPage
        },
        setFilter(state, action) {
            const { name, filter } = action.payload
            state.filters[name] = filter // filter must contain {id,value}
        }
    },
})


export const { setSelectedId, setPagination, setFilter } = movesInfo.actions
export default movesInfo.reducer