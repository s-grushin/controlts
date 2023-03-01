import Tooltip from '../Tooltip'
import ConditionalWrapper from '../ConditionalWrapper'
import { Button } from 'react-bootstrap'

const AppButton = ({ children, onClick, variant, size, className, tooltipText, ...rest }) => {

    const defaultClasses = 'd-flex align-items-center'

    return (
        <ConditionalWrapper
            condition={tooltipText}
            wrapper={(children) => <Tooltip tooltipText={tooltipText}>{children}</Tooltip>}
        >
            <Button
                onClick={onClick}
                size={size}
                variant={variant}
                className={[defaultClasses, className].join(' ')}
                {...rest}
            >
                {children}
            </Button>
        </ConditionalWrapper>
    )
}

AppButton.defaultProps = {
    variant: 'outline-primary',
    size: 'sm',
    className: '',
    tooltipText: ''
}

export default AppButton