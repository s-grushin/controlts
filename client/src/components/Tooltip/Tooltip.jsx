import { OverlayTrigger, Tooltip as BTooltip } from 'react-bootstrap'

const Tooltip = ({ children, placement, tooltipText, show, hide }) => {


    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show, hide }}
            overlay={<BTooltip id='button-tooltip'>{tooltipText}</BTooltip>}
        >
            {children}
        </OverlayTrigger>
    )

}

Tooltip.defaultProps = {
    placement: 'top',
    show: 750,
    hide: 120,
}

export default Tooltip