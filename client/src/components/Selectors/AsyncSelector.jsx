import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'
import useDebounce from '../../hooks/useDebounce'
import useHttp from '../../hooks/useHttp'
import { mapValues } from './utils'

//поиск по вводу с запросом на сервер
const AsyncSelector = (props) => {
    const { fetchUrl, searchField, setSelectedId, defaultOptions, placeholder, isCreatable, isClearable } = props

    const debounce = useDebounce()
    const { request } = useHttp()

    const loadOptions = (inputValue, callback) => {
        if (inputValue.length < 2) {
            callback([])
            return
        }
        debounce(async () => {
            const { rows } = await request(`${fetchUrl}?${searchField}=${inputValue}`)
            callback(mapValues(rows))
        })
    }

    const onChangeHandler = (selectedValue) => {
        if (!selectedValue) {
            return setSelectedId(null)
        }
        setSelectedId(selectedValue.value)
    }

    if (isCreatable) {
        return (
            <AsyncCreatableSelect
                defaultOptions={defaultOptions}
                placeholder={placeholder}
                isClearable={isClearable}
                loadOptions={loadOptions}
                onChange={onChangeHandler}
            />
        )
    } else {
        return (
            <AsyncSelect
                defaultOptions={defaultOptions}
                placeholder={placeholder}
                isClearable={isClearable}
                loadOptions={loadOptions}
                onChange={onChangeHandler}
            />
        )
    }


}

AsyncSelector.defaultProps = {
    searchField: 'searchValue',
    defaultOptions: [],
    isClearable: true,
    isCreatable: true,
    placeholder: 'Выбрать',
    noOptionsMessage: 'Не найдено',
}

export default AsyncSelector