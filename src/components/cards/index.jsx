import { Card, Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../../../src/app/chart/actions";
import { formatRupiah } from "../../helper";
import { useSelector } from "react-redux";
import './../../Collor.css';
import Swal from "sweetalert2";
const Cards = (props) => {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (token) {
      dispatch(addItem(props.addToChart()));
    } else {
      Swal.fire({
        text: "Please login",
        icon: "warning",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  const style = {
    backgroundColor:'#fb8500',
    color:'white',
    borderRadius:'10px'
  }
  return (
    <Col lg={4} className="mt-2">
      <Card
        style={style}
        className="h-100"
      >
        <Card.Img variant="top" style={{width:'65%', height:'55%'}} src={props.image} />
        <Card.Body></Card.Body>
        <Row lg={12}>
          <Col lg={8}>
        <div className="px-3 pb-3 text-white">
          <Card.Title className="">{props.name}</Card.Title>
          <Card.Text>{formatRupiah(props.price)}</Card.Text>
        </div>
        </Col>
        <Col lg={4}>
        <Button variant="danger" className=""  onClick={handleClick}>
          {" "}
          <i className="fa-solid fa-cart-shopping"></i>
        </Button>
        </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default Cards;
