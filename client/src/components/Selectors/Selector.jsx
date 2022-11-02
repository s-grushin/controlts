import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { mapValues } from './utils'

const Selector = (props) => {

  const { options,
    setSelectedId,
    selectedId,
    isCreatable,
    isClearable,
    isSearchable,
    placeholder,
    isDisabled,
    isLoading,
    noOptionsMessage,
  } = props

  const mapOptions = (options) => {
    //return options.map(item => ({ value: item.id, label: item.name }))
    return mapValues(options)
  }

  const onChangeHandler = (selectedValue) => {
    if (!selectedValue) {
      return setSelectedId(null)
    }
    setSelectedId(selectedValue.value)
  }

  const mappedOptions = mapOptions(options)

  const setValue = () => {
    if (!selectedId) {
      return null
    }
    return mappedOptions.find(item => item.value === selectedId)

  }

  if (isCreatable) {
    return (
      <CreatableSelect
        options={mappedOptions}
        value={setValue()}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        onChange={onChangeHandler}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
        noOptionsMessage={() => noOptionsMessage}
      />
    )
  } else {
    return (
      <Select
        options={mappedOptions}
        value={setValue()}
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
}

export default Selector