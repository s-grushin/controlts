import { Card } from 'react-bootstrap'

const VehiclePhoto = ({ number, photoUrl, ...props }) => {

    if (!photoUrl) return null

    const src = `${process.env.REACT_APP_SERVER}/${photoUrl}`

    return (
        <Card {...props}>
            <Card.Img variant="top" src={src} height='150' />
            <Card.Body>
                <Card.Title>{number}</Card.Title>
                <Card.Link href={src} target='_blank'>На весь экран</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default VehiclePhoto