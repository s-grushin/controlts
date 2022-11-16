import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { mapValues } from './utils'
import useHttp from '../../hooks/useHttp'

const Selector = (
  {
    options,
    setSelectedId,
    selectedId,
    isCreatable,
    isClearable,
    isSearchable,
    placeholder,
    isDisabled,
    isLoading,
    noOptionsMessage,
    name,
    parentId,
    createUrl,
    createData
  }) => {

  const [extraOptions, setExtraOptions] = useState([])

  const { request, loading: requestLoading, error, clearError } = useHttp()

  const mapOptions = (options) => {
    return mapValues(options)
  }


  if (error) {
    alert(error)
    clearError()
  }

  const onChangeHandler = async (selectedValue) => {

    if (selectedValue?.__isNew__) {
      const res = await request(createUrl, 'post', { name: selectedValue.value, ...createData })
      setExtraOptions([...extraOptions, res.data])
      setSelectedId(res.data.id)
      return
    }

    if (!selectedValue) {
      return setSelectedId(null)
    }
    setSelectedId(selectedValue.value)
  }

  const mappedOptions = mapOptions(options)
  const mappedExtraOptions = mapOptions(extraOptions)

  const getValue = () => {
    if (!selectedId) {
      return null
    }
    const value = mappedOptions.find(item => item.value === selectedId)
    return value
  }

  useEffect(() => {
    setExtraOptions([])
  }, [parentId])


  if (isCreatable) {
    return (
      <CreatableSelect
        options={[...mappedOptions, ...mappedExtraOptions]}
        value={getValue()}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        onChange={onChangeHandler}
        isDisabled={isDisabled || isLoading || requestLoading}
        isLoading={isLoading || requestLoading}
        noOptionsMessage={() => noOptionsMessage}
        formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
      />
    )
  } else {
    return (
      <Select
        options={[...mappedOptions, ...mappedExtraOptions]}
        value={getValue()}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        onChange={onChangeHandler}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
      />
    )
  }

}

Selector.defaultProps = {
  options: [],
  isCreatable: true,
  isClearable: true,
  isSearchable: true,
  placeholder: 'Выбрать',
  isDisabled: false,
  isLoading: false,
  noOptionsMessage: 'Не найдено',
  createData: {},
}

export default Selector