import { Form, FloatingLabel, Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import GetAddress from "./getAddress";
import axios from "axios";
import Swal from "sweetalert2";
import { PostAddress } from "./address";

const Address = (props) => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [show, setShow] = useState(false);
  const [isSubmmited, setIsSubmitted] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initVal = {
    provinsi: {},
    kabupaten: {},
    kecamatan: {},
    kelurahan: {},
  };

  const [getAddrres, setAddressVal] = useState(initVal);
  const apikey =
    "9ec0b4e37863a5316e5a98f39d3e7537914af72c0a39663c9a47c4b34ca3428a";
  useEffect(() => {
    axios
      .get(`https://api.binderbyte.com/wilayah/provinsi?api_key=${apikey}`)
      .then((res) => {
        setProvinsi(res.data.value);
      });
  }, []);

  useEffect(() => {
    if (getAddrres.provinsi.id) {
      axios
        .get(
          `https://api.binderbyte.com/wilayah/kabupaten?id_provinsi=${getAddrres.provinsi.id}&api_key=${apikey}`
        )
        .then((res) => setKabupaten(res.data.value));
    }
  }, [getAddrres.provinsi.id]);

  useEffect(() => {
    if (getAddrres.kabupaten.id) {
      axios
        .get(
          `https://api.binderbyte.com/wilayah/kecamatan?id_kabupaten=${getAddrres.kabupaten.id}&api_key=${apikey}`
        )
        .then((res) => setKecamatan(res.data.value));
    }
  }, [getAddrres.kabupaten.id]);

  useEffect(() => {
    if (getAddrres.kecamatan.id) {
      axios
        .get(
          `https://api.binderbyte.com/wilayah/kelurahan?id_kecamatan=${getAddrres.kecamatan.id}&api_key=${apikey}`
        )
        .then((res) => setKelurahan(res.data.value));
    }
  }, [getAddrres.kecamatan.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      name: name,
      detail: detail,
      provinsi: getAddrres.provinsi.name,
      kabupaten: getAddrres.kabupaten.name,
      kecamatan: getAddrres.kecamatan.name,
      kelurahan: getAddrres.kelurahan.name,
    };
    await PostAddress(payload);
    Swal.fire({
      text: "success add data",
      icon: "success",
      toast: true,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 1500,
    });
    setIsSubmitted(true);
  };

  return (
    <div className={!props.fromProfil ? "mt-3" : "" }>
      <div className="d-flex justify-content-end">
      </div>
      <Modal show={show}>
        <Modal.Header >
          <Modal.Title>Address </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingTextarea2" label="Name">
              <Form.Control
                type="text"
                placeholder="Leave a comment here"
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <Form.Select
              className="mt-1"
              aria-label="Default select example"
              onChange={(e) => {
                setAddressVal({
                  ...getAddrres,
                  provinsi: JSON.parse(e.target.value),
                });
              }}
            >
              <option>provinsi</option>
              {provinsi.map((item, index) => {
                return (
                  <>
                    <option
                      key={index}
                      value={JSON.stringify({ id: item.id, name: item.name })}
                    >
                      {item.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>

            <Form.Select
              className="mt-1"
              aria-label="Default select example"
              onChange={(e) =>
                setAddressVal({
                  ...getAddrres,
                  kabupaten: JSON.parse(e.target.value),
                })
              }
              disabled={getAddrres.provinsi.id ? "" : "disabled"}
            >
              <option>kabupaten</option>
              {kabupaten.map((item, index) => {
                return (
                  <>
                    <option
                      key={index}
                      value={JSON.stringify({ id: item.id, name: item.name })}
                    >
                      {item.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>

            <Form.Select
              className="mt-1"
              aria-label="Default select example"
              onChange={(e) =>
                setAddressVal({
                  ...getAddrres,
                  kecamatan: JSON.parse(e.target.value),
                })
              }
              disabled={getAddrres.kabupaten.id ? "" : "disabled"}
            >
              <option>kecamatan</option>
              {kecamatan.map((item, index) => {
                return (
                  <>
                    <option
                      key={index}
                      value={JSON.stringify({ id: item.id, name: item.name })}
                    >
                      {item.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>

            <Form.Select
              className="mt-1"
              aria-label="Default select example"
              onChange={(e) =>
                setAddressVal({
                  ...getAddrres,
                  kelurahan: JSON.parse(e.target.value),
                })
              }
              disabled={getAddrres.kecamatan.id ? "" : "disabled"}
            >
              <option>kelurahan</option>
              {kelurahan.map((item, index) => {
                return (
                  <>
                    <option
                      key={index}
                      value={JSON.stringify({ id: item.id, name: item.name })}
                    >
                      {item.name}
                    </option>
                  </>
                );
              })}
            </Form.Select>

            <FloatingLabel controlId="floatingTextarea2" label="Detail">
              <Form.Control
                className="mt-1"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={(e) => setDetail(e.target.value)}
              />
            </FloatingLabel>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <GetAddress isSubmmited={isSubmmited} fromProfil={props.fromProfil} onClick={handleShow} />
    </div>
  );
};

export default Address;
