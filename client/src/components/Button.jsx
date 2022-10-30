import { Button as BootstrapButton, Spinner } from 'react-bootstrap'


const Button = ({ children, variant, title, size, withSpinner, loading, disabled, clickHandler, ...props }) => {
    return (
        <BootstrapButton {...props} variant={variant} size={size} disabled={loading || disabled} onClick={clickHandler}>
            {withSpinner && loading &&
                <Spinner
                    as="span"
                    animation="grow"
                    size={size}
                    role="status"
                    aria-hidden="true"
                />}
            {title}
            {children}
        </BootstrapButton>
    )
}

Button.defaultProps = {
    variant: 'outline-primary',
    title: 'Сохранить и выйти', //%Translate%
    size: 'sm',
    withSpinner: false,
    loading: false,
    disabled: false,
}

export default Button