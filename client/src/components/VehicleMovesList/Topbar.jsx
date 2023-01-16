import { Form, NavDropdown, Stack } from 'react-bootstrap'

const Topbar = ({ ...props }) => {
    return (
        <Stack
            direction='horizontal'
            {...props}
        >
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Поиск"
                    className="me-2"
                    aria-label="Search"
                    size='sm'
                />

                <NavDropdown title="Показывать въезды" id="basic-nav-dropdown" className='my-auto'>
                    <NavDropdown.Item href="#">Все</NavDropdown.Item>
                    <NavDropdown.Item href="#">На территории</NavDropdown.Item>
                    <NavDropdown.Item href="#">За двое суток</NavDropdown.Item>
                    <NavDropdown.Item href="#">За последнюю неделю</NavDropdown.Item>
                    <NavDropdown.Item href="#">За последний месяц</NavDropdown.Item>
                    <NavDropdown.Item href="#">За этот год</NavDropdown.Item>
                </NavDropdown>
            </Form>
        </Stack>

    )
}

export default Topbar