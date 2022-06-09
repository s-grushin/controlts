import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar bg="light" variant="light" fixed='bottom'>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link target='_blank' href="http://vikas.com.ua">Vikas.com.ua</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Footer