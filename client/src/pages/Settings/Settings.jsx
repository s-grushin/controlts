import { Row, Col, Tab, Nav } from 'react-bootstrap'
import PersonalSettings from './Tabs/PersonalSettings'
import Constants from './Tabs/Constants'


const menu = [
    { id: 1, title: 'Персональные настройки', name: 'personalSettings' },
    { id: 2, title: 'Константы', name: 'constants' },
    { id: 3, title: 'Прочее', name: 'other' },
]

const Settings = () => {

    return (
        <Tab.Container defaultActiveKey="personalSettings" className='mt-1'>
            <Row className='mx-auto mt-2'>
                <Col sm={4}>
                    <Nav variant="pills" className="flex-column">
                        {
                            menu.map(item => (
                                <Nav.Item
                                    key={item.id}
                                >
                                    <Nav.Link
                                        eventKey={item.name}
                                    >
                                        {item.title}
                                    </Nav.Link>
                                </Nav.Item>
                            ))

                        }
                    </Nav>
                </Col>
                <Col sm={5}>
                    <Tab.Content>
                        <Tab.Pane eventKey="personalSettings">
                            <PersonalSettings />
                        </Tab.Pane>
                        <Tab.Pane eventKey="constants">
                            <Constants />
                        </Tab.Pane>
                        <Tab.Pane eventKey="other">
                            Пусто
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default Settings