import axios from "axios";
import { useEffect } from "react";
import { Card, Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { addItem, removeItem } from "../../app/chart/actions";
import { formatRupiah, getTotal, subTotal } from "../../helper";
import { cancelOrder } from "../../app/chart/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {conf} from '../../conf';
const Chart = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const charts = useSelector((state) => state.chart);
  const { token } = localStorage.getItem('auth')? JSON.parse(localStorage.getItem("auth")) : '';
  const urlImage = `${conf.api_url}/images/products/`;
  useEffect(() => {
    if (charts && token) {
      const fetchChart = async () => {
        await axios.put(
          `${conf.api_url}/api/v1/carts/`,
          { items: charts },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      };
      localStorage.setItem("charts", JSON.stringify(charts));
      fetchChart();
    }
  }, [charts, token]);

  const checkout = () => {
    if (charts.length !== 0) {
      navigate("/checkout");
    } else {
      Swal.fire({
        text: "Please input item",
        icon: "warning",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  const handleCancel = () => {
    dispatch(cancelOrder());
    navigate("/");
  };
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            {props.Checkout ? "REVIEW ORDER" : "CHART"}
          </Navbar.Brand>
          {props.Checkout && (
            <div className="ms-auto ">
              <button
                onClick={handleCancel}
                className="btn btn-danger justify-content-end"
              >
               <i className="fa-solid fa-trash"></i>{" "}
                cancel
              </button>
            </div>
          )}
        </Container>
      </Navbar>
      <Card style={{ width: props.width }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            TOTAL :{" "}
            <span className="fw-bold">{formatRupiah(subTotal(charts))}</span>
          </Card.Subtitle>

          {charts.map((item, index) => {
            return (
              <div key={index} className="mt-3">
                <Row lg={12}>
                  <Col lg={4}>
                    <img
                      style={{ width: "2rem" }}
                      src={urlImage + item.image_url}
                      alt=""
                    />
                    <Col>
                    <span>{item.name}</span>
                    </Col>
                  </Col>
                  <Col lg={4}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      -
                    </Button>{" "}
                    {item.qty}{" "}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        dispatch(addItem(item));
                      }}
                    >
                      +
                    </Button>
                  </Col>
                  <Col lg={4}>
                    <span className="fw-light">
                      {formatRupiah(getTotal(item))}
                    </span>
                  </Col>
                </Row>
                {/* <hr /> */}
              </div>
            );
          })}
        </Card.Body>
        {!props.Checkout && (
          <button className="btn btn-warning text-white" size="lg" style={{backgroundColor:'#fb8500', color:''}} onClick={checkout}>
            Checkout
          </button>
        )}
      </Card>
    </>
  );
};

export default Chart;
