import { Stack } from 'react-bootstrap'
import Button from '../Button'

const Topbar = ({ itemSelected, backHandler, createHandler, editHandler, deleteHandler }) => {
  
  return (
    <div className='mb-2'>
      <Stack direction='horizontal' gap={2}>
        <Button title='Назад' variant='outline-secondary' clickHandler={backHandler} />
        <Button title='Создать' clickHandler={createHandler} />
        <Button title='Редактировать' clickHandler={editHandler} disabled={!itemSelected} />
        <Button title='Удалить' variant='outline-danger' clickHandler={deleteHandler} disabled={!itemSelected} />
      </Stack>
    </div>
  )
}

export default Topbar