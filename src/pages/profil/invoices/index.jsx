import { useEffect, useState } from "react";
import { Table, Button, Alert, Spinner, Pagination } from "react-bootstrap";
import axios from "axios";
import { conf } from "../../../conf";
import { formatRupiah, subTotal } from "../../../helper";
import { useNavigate } from "react-router";
import DetailOrder from "./detailOrder";
const InvoicesProfile = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState([])
  const handleShow = (orderItem) =>{
    setOrder(orderItem)
    setShow(true)
  } ;
  const handleClose = () => {
    setOrder([])
    setShow(false)
  };
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(5);
  const [skip, setSkip] = useState(0)

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = invoices.slice(firstPost, lastPost);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(invoices.length / postPerPage); i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
    setSkip(skip + currentPost)
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${conf.api_url}/api/v1/orders?skip=${skip}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInvoices(res.data.data);
        setLoading(false);
      });
  }, [skip]);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th># Order ID</th>
            <th>status</th>
            <th>Total</th>
            <th>Detail</th>
            <th>invoices</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : invoices.length < 1 ? (
            <tr>
              <td colSpan={4} className="text-center">
                invoices not found
              </td>
            </tr>
          ) : (
            currentPost.map((el, index) => {
              return (
                <tr key={index}>
                  <td>#{el.order_number}</td>
                  <td>
                    <Alert variant="danger" size="sm">
                      {el.status}
                    </Alert>
                  </td>
                  <td>{formatRupiah(subTotal(el.order_items))}</td>
                  <td> <Button variant="secondary" onClick={() => handleShow(el.order_items)}><i className="fa-solid fa-eye"></i></Button></td>
                 
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
            })
          )}
        </tbody>
      </Table>
    {order.length > 0 && <DetailOrder isModalVisisble={show} orderItem={order}  onClose={handleClose} /> }  
      <div className="mt-4 d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            disabled={number <= 1}
            onClick={() => setNumber(number - 1)}
          />
          {pageNumber.map((Elem, index) => {
            return (
              <div key={index}>
                <Pagination.Item
                
                  variant="danger"
                  active={Elem === number}
                  onClick={() => ChangePage(Elem)}
                >
                  {Elem}
                </Pagination.Item>
              </div>
            );
          })}
          <Pagination.Next
            onClick={() => setNumber(number + 1)}
            disabled={number >= pageNumber.length}
          />
        </Pagination>
      </div>
    </>
  );
};

export default InvoicesProfile;
