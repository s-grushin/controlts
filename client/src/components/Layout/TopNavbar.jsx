import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AppGlobalDataContext } from '../../context/AppGlobalDataProvider'

const TopNavbar = () => {

    const { isAuth, userInfo, logout } = useContext(AppGlobalDataContext)

    const logoutHandler = () => {
        logout()
    }

    if (!isAuth) {
        return null
    } else {
        return (
            <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Главное окно</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">
                            </Nav.Link>
                            <LinkContainer to="/arrival">
                                <Button variant='outline-warning'>Оформить въезд</Button>
                            </LinkContainer>
                            <NavDropdown title="Сервис" id="collasible-nav-dropdown">
                                <LinkContainer to='/settings'>
                                    <NavDropdown.Item>Настройки</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/catalog'>
                                    <NavDropdown.Item>Справочники</NavDropdown.Item>
                                </LinkContainer>
                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">NEW</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <LinkContainer to='/profile' activeClassName=''>
                                <Nav.Link>{`${userInfo.username}${userInfo.fullName ? ` (${userInfo.fullName})` : ''}`}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={logoutHandler}>Выйти</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default TopNavbar