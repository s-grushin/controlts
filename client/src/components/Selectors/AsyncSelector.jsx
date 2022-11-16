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
    isCreatable,
    isClearable
}) => {



    const debounce = useDebounce()
    const { request, loading } = useHttp()

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

    const onChangeHandler = async (selectedValue) => {

        if (selectedValue?.__isNew__) {
            if (createUrl) {
                const res = await request(createUrl, 'post', createData)
                console.log(res);
            }
        }

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
                formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
                isLoading={loading}
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
}

export default AsyncSelector