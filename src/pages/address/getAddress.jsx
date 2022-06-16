import { useEffect, useState } from "react";
import {
  FormCheck,
  Row,
  Container,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { postAddress } from "../../app/address/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { conf } from "../../conf";
const GetAddress = (props) => {
  const [address, setAddress] = useState([]);
  const dispatch = useDispatch();
  const { token } = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    axios
      .get(`${conf.api_url}/api/v1/deliveryAddress`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAddress(res.data.data));
  }, [props.isSubmmited, token]);
  const handleSelect = (e) => {
    const address = JSON.parse(e.target.value);
    dispatch(postAddress(address));
  };

  return (
    <Card>
      <Card.Header as="h5" className="d-flex">
        Address
        <Button variant="primary" className="ms-auto" onClick={props.onClick}>
          add address
        </Button>
      </Card.Header>
      {address.length < 1 ? (
        <div className="bg-light" style={{ width: "40rem" }}>
          <p className="text-center">Address not found</p>
        </div>
      ) : props.fromProfil ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provinsi</th>
              <th>Kabupaten</th>
              <th>Kecamatan</th>
              <th>kelurahan</th>
            </tr>
          </thead>
          <tbody>
            {address.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.provinsi}</td>
                  <td>{e.kabupaten}</td>
                  <td>{e.kecamatan}</td>
                  <td>{e.kelurahan}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        address.map((e, index) => {
          return (
            <Container key={index} className="mt-3">
              <Row>
                <div className="bg-light" style={{ width: "40rem" }}>
                  <Col>
                    <FormCheck
                      type="radio"
                      id={e.id}
                      name="radio"
                      onChange={handleSelect}
                      value={JSON.stringify({
                        id: e._id,
                        provinsi: e.provinsi,
                        kabupaten: e.kabupaten,
                        kecamatan: e.kecamatan,
                        kelurahan: e.kecamatan,
                      })}
                    />
                  </Col>
                  <Col>
                    <div className="flex">
                      <h4>{e.name}</h4>
                      <p>
                        {e.provinsi} {e.kabupaten}, {e.kecamatan}, {e.kelurahan}
                      </p>
                    </div>
                  </Col>
                </div>
              </Row>
            </Container>
          );
        })
      )}
    </Card>
  );
};

export default GetAddress;
