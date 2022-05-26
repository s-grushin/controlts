import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'

const TopNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Главное окно</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">
                        </Nav.Link>
                        <Button variant='outline-warning'>Оформить въезд</Button>
                        <NavDropdown title="Сервис" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Настройки</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Справочники</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">NEW</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavbar