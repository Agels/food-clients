import {ListGroup, Col, Tab, Row, Container} from 'react-bootstrap';
// import Invoices from '../invoices';
const Profil = () => {
    return (
        <Container className='mt-5'>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Address
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Invoices
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                {/* <Sonnet /> */}
                <p>tes</p>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
            <p>Invoices</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </Container>
    )
}
export default Profil;