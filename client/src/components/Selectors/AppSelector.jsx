import { useState, useEffect } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import useDebounce from '../../hooks/useDebounce'
import useHttp from '../../hooks/useHttp'

export const mapValues = (values, valueProp = 'id', labelProp = 'name') => {
    return values.map(item => ({ value: item[valueProp], label: item[labelProp] }))
}

const AppSelector = () => {
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
}

AppSelector.defaultProps = {
    defaultOptions: [],
    placeholder: 'Выбрать',
    searchField: 'searchValue',
    queryParams: '',
    presentationField: 'name',
    isClearable: true,
    isCreatable: true,
    noOptionsMessage: 'Не найдено',
    createData: {},
}

export default AppSelector