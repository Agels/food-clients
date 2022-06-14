import { Form, FloatingLabel } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { postAddress } from "./address";
const Address = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const initVal = {
    provinsi : {
      id_provinsi :0,
      nameprovinsi:'',
    },
    kabupaten : {
      id_kabupaten:0,
      namaKabupaten:'',
    },
    kecamatan : {
      id_kecamatan:0,
      namaKecamatan:'',
    },
    kelurahan : {
      id_kelurahan:0,
      namaKelurahan:''
    }
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
    if (getAddrres.provinsi.id_provinsi) {
      axios
        .get(
          `https://api.binderbyte.com/wilayah/kabupaten?id_provinsi=${getAddrres.provinsi.id_provinsi}&api_key=${apikey}`
        )
        .then((res) => setKabupaten(res.data.value));
    }
  }, [getAddrres.provinsi.id_provinsi]);

  useEffect(() => {
    if (getAddrres.id_kabupaten) {
      axios
        .get(
          `https://api.binderbyte.com/wilayah/kecamatan?id_kabupaten=${getAddrres.id_kabupaten}&api_key=${apikey}`
        )
        .then((res) => setKecamatan(res.data.value));
    }
  }, [getAddrres.id_kabupaten]);

  useEffect(() => {
    if (getAddrres.id_kecamatan) {
      axios
        .get(
          `https://api.binderbyte.com/wilayah/kelurahan?id_kecamatan=${getAddrres.id_kecamatan}&api_key=${apikey}`
        )
        .then((res) => setKelurahan(res.data.value));
    }
  }, [getAddrres.id_kecamatan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      nama: name,
      provinsi: getAddrres.provinsi.,
      kabupaten: kabupaten.name,
      kecamatan: kecamatan.name,
      kelurahan: kelurahan.name,
      detail: detail,
    };
    console.log(payload);
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="text"
        aria-describedby="passwordHelpBlock"
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          setAddressVal({
            ...getAddrres,
                provinsi : {
                  id_provinsi:e.target.value,
                  nameprovinsi:JSON.parse(e.target.value)
                },
                kabupaten : {
                  id_kabupaten:0
                }     
          });
        }} 
      >
        {console.log(getAddrres.id_kecamatan)}
        <option>provinsi</option>
        {provinsi.map((item) => {
          return (
            <>
              <option value={JSON.stringify({value1: item.id, value2: item.name})}>{item.name}</option>
            </>
          );
        })}
      </Form.Select>

      <Form.Select
        aria-label="Default select example"
        onChange={(e) =>
          setAddressVal({
            ...getAddrres,
            id_kabupaten: e.target.value,
            id_kecamatan: null,
          })
        }
        disabled={getAddrres.provinsi.id_provinsi ? "" : "disabled"}
      >
        <option>kabupaten</option>
        {kabupaten.map((item) => {
          return (
            <>
              <option value={item.id}>{item.name}</option>
            </>
          );
        })}
      </Form.Select>

      <Form.Select
        aria-label="Default select example"
        onChange={(e) =>
          setAddressVal({
            ...getAddrres,
            id_kecamatan: e.target.value,
            id_kelurahan: null,
          })
        }
        disabled={getAddrres.id_kabupaten ? "" : "disabled"}
      >
        <option>kecamatan</option>
        {kecamatan.map((item) => {
          return (
            <>
              <option value={item.id}>{item.name}</option>
            </>
          );
        })}
      </Form.Select>

      <Form.Select
        aria-label="Default select example"
        onChange={(e) =>
          setAddressVal({
            ...getAddrres,
            id_kelurahan: e.target.value,
          })
        }
        disabled={getAddrres.id_kecamatan ? "" : "disabled"}
      >
        <option>kelurahan</option>
        {kelurahan.map((item) => {
          return (
            <>
              <option value={item.id}>{item.name}</option>
            </>
          );
        })}
      </Form.Select>

      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          onChange={(e) => setDetail(e.target.value)}
        />
      </FloatingLabel>
      <button className="btn btn-orange" type="submit">
        tes
      </button>
    </Form>
  );
};

export default Address;
