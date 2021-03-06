import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { formatRupiah, subTotal } from "../../helper";
import { cancelOrder } from "../../app/chart/actions";
import { useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { conf } from "../../conf";
const Order = (props) => {
  const address = useSelector((state) => state.address.address);
  const chart = useSelector((state) => state.chart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const payload = {
    delivery_address: address.id,
    delivery_fee: 20000,
  };
  const submit = async () => {
    setLoading(true);
    const { data } = await axios.post(
      `${conf.api_url}/api/v1/orders`,
      payload,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data) {
      Swal.fire({
        text: "success add data",
        icon: "success",
        toast: true,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(cancelOrder());
      navigate(`/invoices/${data.data._id}`);
    }
    setLoading(false);
  };
  return (
    <div className="mt-3">
      <Card style={{ width: "40rem" }}>
        <Card.Header as="h5">Confirmation</Card.Header>
        <Card.Body>
          <Row lg={12}>
            <Col lg={6}>Adrress</Col>
            <Col lg={6}>
              <p>
                {address.provinsi}, {address.kabupaten}, {address.kecamatan},
                {address.kelurahan}
              </p>
            </Col>
            <hr />
            <Col lg={6}>
              <p className="">SUB TOTAL</p>
            </Col>
            <Col lg={6}>{formatRupiah(subTotal(chart))}</Col>
            <hr />
            <Col lg={6}>
              <p className="">DELIVERY FEE </p>
            </Col>
            <Col> {formatRupiah(20000)}</Col>
            <hr />
            <Col lg={6}>
              <p className="fw-bold">TOTAL </p>
            </Col>

            <Col lg={6}>{formatRupiah(subTotal(chart) + 20000)}</Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex">
        <Button
          onClick={() => props.goBackPage()}
          className="btn btn-danger mt-3"
        >
          back
        </Button>
        {isLoading ? (
          <Button variant="primary"  className="ms-auto mt-3" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
             
            />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="ms-auto mt-3" onClick={submit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
export default Order;
