import { useState, useMemo } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreateUpdateItem from '../../Item/CreateUpdateItem'
import useInputChange from '../../../hooks/useInputChange'

const CreateUpdateCompany = ({ variant }) => {

  const [name, setName] = useState('')

  const inputChangeHandler = useInputChange()

  const updateOptions = useMemo(() => [
    { field: 'name', setState: setName }
  ], [])

  return (
    <CreateUpdateItem
      variant={variant}
      fetchUrl='/vehicleTypes'
      data={{ name }}
      updateOptions={updateOptions}
    >
      <Card className='mt-2'>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Наименование</Form.Label>
              <Form.Control size='sm' type="text"
                onChange={e => inputChangeHandler(e, setName)}
                placeholder="Наименование"
                name="name"
                value={name} />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </CreateUpdateItem>
  )
}

export default CreateUpdateCompany