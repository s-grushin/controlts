import { Button as BootstrapButton, Spinner } from 'react-bootstrap'


const Button = ({ children, variant, title, size, withSpinner, loading, disabled, clickHandler, className, disableFlex, ...props }) => {

    const dflexCenter = disableFlex ? '' : 'd-flex align-items-center'

    const defaultClasses = 'text-nowrap'

    let classNames = [defaultClasses, dflexCenter, className].join(' ');

    return (
        <BootstrapButton
            className={classNames}
            variant={variant}
            size={size}
            disabled={loading || disabled}
            onClick={clickHandler}
            {...props}
        >

            {withSpinner && loading &&
                <Spinner
                    as="span"
                    animation="grow"
                    size={size}
                    role="status"
                    aria-hidden="true"
                />}
                &nbsp;
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
    disableFlex: false,
}

export default Button