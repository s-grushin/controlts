import { useState, useEffect } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import useDebounce from '../../hooks/useDebounce'
import useHttp from '../../hooks/useHttp'

export const mapValues = (values, valueProp = 'id', labelProp = 'name') => {
    return values.map(item => ({ value: item[valueProp], label: item[labelProp] }))
}

const Selector = ({
    options,
    selectedId,
    setSelectedId,
    parentId,
    inputSearchUrl,
    inputSearchFieldName,
    inputSearchQueryParams,
    postUrl,
    postData,
    presentationField,
    placeholder,
    isClearable,
    isDisabled,
    isLoading,
    name
}) => {

    const [createdOptions, setCreatedOptions] = useState([])

    const mappedOptions = mapValues(options, 'id', presentationField)
    const mappedCreatedOptions = mapValues(createdOptions, 'id', presentationField)
    const combinedOptions = [...mappedOptions, ...mappedCreatedOptions]


    const { request, loading: requestLoading, error, clearError } = useHttp()
    const debounce = useDebounce()


    const onChangeHandler = async (selectedValue) => {

        if (selectedValue?.__isNew__) {
            const res = await request(postUrl, 'post', { [presentationField]: selectedValue.value, ...postData })
            setCreatedOptions([...createdOptions, res.data])
            setSelectedId(res.data.id)
            return
        }

        if (selectedValue) {
            setSelectedId(selectedValue.value)
        } else {
            setSelectedId(null)
        }

    }

    const loadOptions = (inputValue, callback) => {

        if (inputValue.length < 2) {
            callback([])
            return
        }
        debounce(async () => {

            if (inputSearchUrl) {
                const { rows } = await request(`${inputSearchUrl}?${inputSearchFieldName}=${inputValue}${inputSearchQueryParams}`)
                const mappedOptions = mapValues(rows, 'id', presentationField)
                callback(mappedOptions)
            } else {
                const founded = options.filter(item => item[presentationField].toLowerCase().includes(inputValue))
                const mappedOptions = mapValues(founded, 'id', presentationField)
                callback(mappedOptions)
            }
        })
    }


    const getValue = () => {
        if (!selectedId) {
            return null
        }

        const value = combinedOptions.find(item => item.value === selectedId)
        return value
    }

    useEffect(() => {
        if (error) {
            alert(error)
            clearError()
        }
    }, [error, clearError])


    useEffect(() => {
        setCreatedOptions([])
    }, [parentId])

    return (
        <AsyncCreatableSelect
            defaultOptions={combinedOptions}
            value={getValue()}
            placeholder={placeholder}
            isClearable={isClearable}
            loadOptions={loadOptions}
            onChange={onChangeHandler}
            formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
            isDisabled={isDisabled}
            isLoading={isLoading || requestLoading}
        />
    )
}

Selector.defaultProps = {
    options: [],
    placeholder: 'Выбрать',
    inputSearchFieldName: 'searchValue',
    inputSearchQueryParams: '',
    fetchQueryParams: '',
    presentationField: 'name',
    isClearable: true,
    isCreatable: true,
    noOptionsMessage: 'Не найдено',
    createData: {},
}

export default Selector