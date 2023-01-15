import Button from '../../components/Button'
import { Printer } from 'react-bootstrap-icons'

const PrintPassButton = ({ ...otherProps }) => {
    return (
        <Button
            variant='outline-secondary'
            title=''
            disableFlex={false}
            href='printForms/pass'
            target='_blank'
            {...otherProps}
        >
            <Printer />
            Печатать пропуск
        </Button>
    )

}

export default PrintPassButton