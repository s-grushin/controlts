import { Button as BootstrapButton, Spinner } from 'react-bootstrap'


const Button = ({ children, variant, title, size, withSpinner, loading, disabled, clickHandler }) => {
    return (
        <BootstrapButton variant={variant} size={size} disabled={loading || disabled} onClick={clickHandler}>
            {withSpinner &&
                <Spinner
                    as="span"
                    animation="border"
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