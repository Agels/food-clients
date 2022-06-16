import { ListGroup, Col, Tab, Row, Container } from "react-bootstrap";
import Navbars from "../../components/navbars";
import InvoicesProfile from "./invoices";
import UserProfil from "./user";
import Address from "../address";
const Profil = () => {

  return (
    <>
      <Navbars />
      <Container className="mt-5">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#profil">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href="#profil">
                  Profil
                </ListGroup.Item>
                <ListGroup.Item action href="#invoices">
                  Invoices
                </ListGroup.Item>
                <ListGroup.Item action href="#address">
                  Address
                </ListGroup.Item>
     
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#profil">
                <UserProfil />
                </Tab.Pane>
                <Tab.Pane eventKey="#invoices">
                  <InvoicesProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="#address">
                  {/* //render component from address */}
                 <Address fromProfil="true" />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};
export default Profil;
