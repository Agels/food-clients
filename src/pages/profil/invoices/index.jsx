import { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { conf } from "../../../conf";
import { formatRupiah, subTotal } from "../../../helper";
import { useNavigate } from "react-router";
const InvoicesProfile= () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate()
  const { token } = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    axios
      .get(`${conf.api_url}/api/v1/orders`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setInvoices(res.data.data));
  }, [token]);

  return (
    <Table  hover>
      <thead>
        <tr>
          <th># Order ID</th>
          <th>status</th>
          <th>Total</th>
          <th>invoices</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((el) => {
          return (
            <tr>
              <td>#{el.order_number}</td>
              <td><Alert variant="danger" size="sm">{el.status}</Alert></td>
              <td>{formatRupiah(subTotal(el.order_items))}</td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/invoices/${el._id}`)}
                >
                  <i className="fa-solid fa-file-lines"></i> Invoice
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default InvoicesProfile;
