import { Button } from 'react-bootstrap'

const AppButton = ({ children, onClick, variant, size, ...rest }) => {

    return (
        <Button
            onClick={onClick}
            size={size}
            variant={variant}
            {...rest}
        >
            {children}
        </Button>
    )
}

AppButton.defaultProps = {
    variant: 'outline-primary',
    size: 'sm'
}

export default AppButton