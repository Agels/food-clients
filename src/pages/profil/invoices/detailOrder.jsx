import { Modal, Table } from "react-bootstrap";
import { formatRupiah, getTotal, subTotal } from "../../../helper";
const DetailOrder = (props) => {
  console.log(props.orderItem);
  return (
    <Modal show={props.isModalVisisble}  onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>price</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {props.orderItem.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 }</td>
                  <td>
                    {el.name} 
                  </td>
                  <td>{formatRupiah(el.price)}&nbsp; x &nbsp;{el.qty}</td>
                  {/* <td>{el.qty}</td> */}
                  <td>{formatRupiah(getTotal(el))}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <p className="text-end fs-5 fw-light">subtotal :  Rp.20.000</p>
        <p className="text-end fs-5 fw-light">Delivery fee: Rp.20.000</p> */}

        <p className="text-end fs-5 fw-bold">
          Total : {formatRupiah(subTotal(props.orderItem))}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default DetailOrder;
