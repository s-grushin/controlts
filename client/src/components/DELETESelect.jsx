import { useId } from 'react'

const Select = ({ options, title, disabled }) => {

    const id = useId()

    const selectHandler = (event) => {
        console.log(event.target.value);
    }

    return (
        <>
            <label htmlFor={`input${id}`}>{title}</label>
            <input
                list={`datalist${id}`}
                id={`input${id}`}
                name={`input${id}`}
                placeholder='поиск по вводу'
                disabled={disabled}
                autoComplete='false'
                onChange={selectHandler}
            />



            <datalist id={`datalist${id}`}>
                {options.map(item => <option value={item.id} label={item.id}></option>)}
            </datalist>
        </>
    )
}

Select.defaultProps = {
    options: [],
    disabled: false
}

export default Select