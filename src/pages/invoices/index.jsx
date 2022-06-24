import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Alert, Container, Col, Row } from "react-bootstrap";
import { formatRupiah } from "../../helper";
import { Link } from "react-router-dom";
import { conf } from "../../conf";
const Invoices = () => {
  const [invoices, setInvoices] = useState({});
  const { orderId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${conf.api_url}/api/v1/invoices/${orderId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInvoices(res.data.data)
        setLoading(false)
      });
  }, [orderId, token]);

  return (
    <div>
      <Container>
        {invoices !== null ? (
          <>
            <Card style={{ width: "40rem" }} className="mx-auto mt-5">
              <Card.Header as="h5">Invoices</Card.Header>
              <Card.Body>
                {console.log(invoices)}
                <Row lg={12}>
                  <Col lg={6}>Order ID</Col>
                  <Col lg={6}>#{invoices.order?.order_number}</Col>
                  <hr />
                  <Col lg={6}>Status</Col>
                  <Col lg={6}>
                    {" "}
                   {isLoading? <p>loading...</p>: <Alert variant="danger">{invoices.payment_status}</Alert>} 
                  </Col>
                  <hr />
                  <Col lg={6}>billed to</Col>
                  <Col lg={6}>
                    <strong>{invoices.user?.full_name}</strong>
                  {isLoading ? <p>loading...</p> : (
                    <p>
                    {invoices.delivery_address?.provinsi},{" "}
                    {invoices.delivery_address?.kabupaten},{" "}
                    {invoices.delivery_address?.kecamatan},
                    {invoices.delivery_address?.kelurahan}
                  </p>
                  )}  
                  </Col>
                  <hr />
                  <Col lg={6}>payment to</Col>
                  <Col lg={6}>
                    <strong>Ardhian Agil Ramadhan</strong>
                    <p>JAWA TIMUR, KAB.SIDOARJO, CANDI, LARANGAN</p>
                  </Col>
                  <hr />

                  <Col lg={6}>
                    <p className="fw-bold">TOTAL </p>
                  </Col>
                 <Col lg={6}>{isLoading ? <p>loading ...</p> : formatRupiah(invoices.total)}</Col> 

                </Row>
              </Card.Body>
            </Card>
            <div className="d-flex mt-2">
              <Link to="/" className="mx-auto ">
                <button className="btn btn-primary">Home</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p>Not found</p>
          </>
        )}
      </Container>
    </div>
  );
};

export default Invoices;
