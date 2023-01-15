import Button from '../../components/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { Printer } from 'react-bootstrap-icons'
import { Link, NavLink } from 'react-router-dom'

const PrintPassButton = ({ ...otherProps }) => {
    return (
        // <LinkContainer
        //     target='_blank'
        //     to='/printForms/pass'
        // >
        //     <Button
        //         variant='outline-secondary'
        //         title=''
        //         disableFlex={false}
        //         to='/printForms/pass'
        //         target='_blank'
        //         {...otherProps}
        //     >
        //         <Printer />
        //         Печатать пропуск
        //     </Button>
        // </LinkContainer>

        <Link to='/printForms/pass' target='_blank'>
            asd
        </Link>


    )

}

export default PrintPassButton