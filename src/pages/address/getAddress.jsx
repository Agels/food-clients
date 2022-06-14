import { useEffect, useState } from "react";
import { FormCheck, Row, Container, Col, Card } from "react-bootstrap";
import { postAddress } from "../../app/address/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import {conf} from '../../conf';
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
      <Card.Header as="h5" >Address</Card.Header>
      {address.length < 1 ? (
       <div className="bg-light" style={{ width: "40rem" }}>
          <p className="text-center">Address not found</p>
        </div>
      ) :  address.map((e, index) => {
        return (
          <Container key={index} className="mt-3">
            
            <Row>
              <div className="bg-light" style={{ width: "40rem"}}>
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
                      {e.pronvisi} {e.kabupaten}, {e.kecamatan}, {e.kelurahan}
                    </p>
                  </div>
                </Col>
              </div>
            </Row>
          </Container>
        );
      }) }
    
      
    </Card>
  );
};

export default GetAddress;
