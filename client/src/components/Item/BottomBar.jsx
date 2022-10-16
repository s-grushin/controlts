import { Stack } from 'react-bootstrap'
import Button from '../Button'

const BottomBar = ({ cancelHandler, saveHandler, isSaving }) => {
  return (
    <Stack direction='horizontal' gap={3} className='mt-2 justify-content-end'>
      <Button title='Отменить' variant='outline-secondary' clickHandler={cancelHandler} />
      <Button clickHandler={saveHandler} loading={isSaving} withSpinner={isSaving} />
    </Stack>
  )
}

export default BottomBar