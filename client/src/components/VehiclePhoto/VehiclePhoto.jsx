import { Card } from 'react-bootstrap'

const VehiclePhoto = ({ number, photoUrl, ...props }) => {

    if (!photoUrl) return null

    const src = `${process.env.REACT_APP_SERVER}/${photoUrl}`

    return (
        <Card {...props}>
            <a href={src} target='_blank' rel='noreferrer'>
                <Card.Img variant="top" src={src} height='150' />
            </a>
            {number &&
                <Card.Body>
                    <Card.Subtitle>{number}</Card.Subtitle>
                </Card.Body>}
        </Card>
    )
}

export default VehiclePhoto