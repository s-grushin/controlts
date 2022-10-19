import { Stack } from 'react-bootstrap'
import Button from '../Button'

const Topbar = ({ itemSelected, backHandler, createHandler, editHandler, deleteHandler, showButtonBack }) => {

  return (
    <Stack direction='horizontal' gap={2} className='mb-2'>
      {showButtonBack && <Button title='Назад' variant='outline-secondary' clickHandler={backHandler} />}
      <Button title='Создать' clickHandler={createHandler} />
      <Button title='Редактировать' clickHandler={editHandler} disabled={!itemSelected} />
      <Button title='Удалить' variant='outline-danger' clickHandler={deleteHandler} disabled={!itemSelected} />
    </Stack>
  )
}

export default Topbar