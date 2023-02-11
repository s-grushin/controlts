import { Row, Col, Tab, Nav } from 'react-bootstrap'
import PersonalSettings from './Tabs/PersonalSettings'
import GlobalSettings from './Tabs/GlobalSettings'


const menu = [
    { id: 1, title: 'Глобальные настройки', name: 'globalSettings' },
    { id: 2, title: 'Персональные настройки', name: 'personalSettings' },
    { id: 3, title: 'Прочее', name: 'other' },
]

const Settings = () => {

    return (
        <Tab.Container defaultActiveKey="settings" className='mt-1'>
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
                        <Tab.Pane eventKey="globalSettings">
                            <GlobalSettings />
                        </Tab.Pane>
                        <Tab.Pane eventKey="personalSettings">
                            <PersonalSettings />
                        </Tab.Pane>
                        <Tab.Pane eventKey="other">
                            Other
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default Settings