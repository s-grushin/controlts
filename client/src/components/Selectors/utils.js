export const mapValues = (values, valueProp = 'id', labelProp = 'name') => {
    return values.map(item => ({ value: item[valueProp], label: item[labelProp] }))
}

