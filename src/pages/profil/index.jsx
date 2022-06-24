import { ListGroup, Col, Tab, Row, Container, Button } from "react-bootstrap";
import Navbars from "../../components/navbars";
import InvoicesProfile from "./invoices";
import UserProfil from "./user";
import Address from "../address";
import { Link } from "react-router-dom";
import { useState } from "react";
const Profil = () => {
  const [active, setActive] = useState("invoices");
  return (
    <>
      <Navbars />
      <Container className="mt-5">
        <Link to="/">
          <Button variant="danger" className="mb-2">
            Back
          </Button>
        </Link>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#invoices">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item
                  action
                  href="#profil"
                  onClick={() => setActive("profil")}
                >
                  Profil
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="#invoices"
                  onClick={() => setActive("invoices")}
                >
                  Invoices
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="#address"
                  onClick={() => setActive("address")}
                >
                  Address
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {active === "profil" && <UserProfil />}

                {active === "invoices" && <InvoicesProfile />}
                {/* //render component from address */}

                {active === "address" && <Address fromProfil="true" />}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};
export default Profil;
