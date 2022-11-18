import { useState } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'
import useDebounce from '../../hooks/useDebounce'
import useHttp from '../../hooks/useHttp'
import { mapValues } from './utils'

//поиск по вводу с запросом на сервер
const AsyncSelector = ({
    fetchUrl,
    searchField,
    presentationField,
    setSelectedId,
    defaultOptions,
    placeholder,
    isDisabled,
    isLoading,
    isCreatable,
    isClearable,
    createUrl,
    createData
}) => {

    const [createdOptions, setCreatedOptions] = useState([])

    const debounce = useDebounce()

    const { request, loading: requestLoading, error, clearError } = useHttp()

    const mapOptions = (options) => {
        return mapValues(options)
    }

    if (error) {
        alert(error)
        clearError()
    }

    const loadOptions = (inputValue, callback) => {
        if (inputValue.length < 2) {
            callback([])
            return
        }
        debounce(async () => {
            const { rows } = await request(`${fetchUrl}?${searchField}=${inputValue}`)
            callback(mapValues(rows, 0, presentationField))
        })
    }

    const mappedCreatedOptions = mapOptions(createdOptions)

    const onChangeHandler = async (selectedValue) => {

        if (selectedValue?.__isNew__) {
            const res = await request(createUrl, 'post', { name: selectedValue.value, ...createData })
            setCreatedOptions([...createdOptions, res.data])
            setSelectedId(res.data.id)
            return
        }

        if (!selectedValue) {
            return setSelectedId(null)
        }
        setSelectedId(selectedValue.value)
    }

    if (isCreatable) {
        return (
            <AsyncCreatableSelect
                defaultOptions={[...mappedCreatedOptions]}
                placeholder={placeholder}
                isClearable={isClearable}
                loadOptions={loadOptions}
                onChange={onChangeHandler}
                formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
                isDisabled={isDisabled}
                isLoading={isLoading || requestLoading}
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
    presentationField: 'name',
    defaultOptions: [],
    isClearable: true,
    isCreatable: true,
    placeholder: 'Выбрать',
    noOptionsMessage: 'Не найдено',
    createData: {},
}

export default AsyncSelector