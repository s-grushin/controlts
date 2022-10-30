import CreatableSelect from 'react-select/creatable'

const Selector = ({ options, setSelectedId, selectedId, isClearable, isSearchable, placeholder, isDisabled, isLoading }) => {

  const mapOptions = (options) => {
    return options.map(item => ({ value: item.id, label: item.name }))
  }

  const onChangeHandler = (selectedValue) => {
    if (!selectedValue) {
      return setSelectedId(null)
    }
    setSelectedId(selectedValue.value)
  }

  console.log(options);

  return (
    <CreatableSelect
      options={mapOptions(options)}
      value={options.find(item => item.id === selectedId)}
      isClearable={isClearable}
      isSearchable={isSearchable}
      placeholder={placeholder}
      onChange={onChangeHandler}
      isDisabled={isDisabled || isLoading}
      isLoading={isLoading}
    />
  )
}

Selector.defaultProps = {
  options: [],
  isClearable: true,
  isSearchable: true,
  placeholder: 'Выбрать',
  isDisabled: false,
  isLoading: false,
}

export default Selector