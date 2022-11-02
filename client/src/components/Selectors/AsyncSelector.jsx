import { useState, useEffect } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'
import useHttp from '../../hooks/useHttp'
import { mapValues } from './utils'

//поиск по вводу с запросом на сервер
const AsyncSelector = (props) => {
    const { defaultOptions, placeholder, isCreatable, isClearable } = props

    const [searchValue, setSearchValue] = useState('')

    const { request } = useHttp()

    const loadOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(async () => {
                const { rows } = await request(`/companies?searchValue=${searchValue}`)
                resolve(mapValues(rows));
            }, 2000);
        });

    if (isCreatable) {
        return (
            <AsyncCreatableSelect
                defaultOptions={defaultOptions}
                placeholder={placeholder}
                isClearable={isClearable}
                loadOptions={loadOptions}
            />
        )
    } else {
        return (
            <AsyncSelect
                defaultOptions={defaultOptions}
                placeholder={placeholder}
                isClearable={isClearable}
                loadOptions={loadOptions}
            />
        )
    }


}

AsyncSelector.defaultProps = {
    defaultOptions: [],
    isClearable: true,
    isCreatable: true,
    placeholder: 'Выбрать',
    noOptionsMessage: 'Не найдено',
}

export default AsyncSelector