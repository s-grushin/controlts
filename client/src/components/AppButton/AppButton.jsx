import { Button } from 'react-bootstrap'

const AppButton = ({ children, onClick, variant, size, className, ...rest }) => {

    const defaultClasses = 'd-flex align-items-center'

    return (
        <Button
            onClick={onClick}
            size={size}
            variant={variant}
            className={[defaultClasses, className].join(' ')}
            {...rest}
        >
            {children}
        </Button>
    )
}

AppButton.defaultProps = {
    variant: 'outline-primary',
    size: 'sm',
    className: ''
}

export default AppButton