import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { userLogin } from "../../../app/auth/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Register from "./index";
import Login from "../login/index";
import Swal from "sweetalert2";
const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [dataRegis, setDataRegis] = useState({
    full_name: "",
    email: "",
    password: "",
  });
const handleLogin = async(payloadx) => {
  const { data } = await Login(payloadx);
      if (data) {
        dispatch(userLogin(data));
        localStorage.setItem("auth", JSON.stringify(payloadx));
      }
}
  const submitRegis = async (e) => {
    e.preventDefault();
    const error = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const { full_name, email, password } = dataRegis;
    if (full_name.length === 0) {
      error.push("full Name cannot be null");
    }
    if (email.length === 0) {
      error.push("email cannot be null");
    } else if (!emailRegex.test(email)) {
      error.push("type email only");
    }

    if (password.length === 0) {
      error.push("password cannot be null");
    } else if (password.length < 6) {
      error.push("password must more than 6");
    }

    if (error.length > 0) {
      setSignupError(error);
    } else {
      setLoading(true)
      setSignupError([]);
      const payload = {
        full_name: full_name,
        email: email,
        password: password,
      };
     const {data} =  await Register(payload);
     let message = "";
     let  icon = "";
     if(data.error === 1){
      message = `${email} already exist`
      icon = "warning";
     } else {
      icon = "success";
      message = "Register Success"
     }
      Swal.fire({
        text:  message,
        icon: icon,
        toast: true,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 1500,
      });

      const payloadx = {
        email: email,
        password: password,
      };
      if(!data.error){
        handleLogin(payloadx);
      }
      props.handleClose();
      setLoading(false)
     
    }
  };
  return (
    <Modal show={props.isModalVisisble} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {signupError.map((e, index) => (
          <div key={index} className="text-danger">
            * {e}
          </div>
        ))}
        <Form onSubmit={submitRegis}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full Name</Form.Label>

            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => {
                setDataRegis({
                  ...dataRegis,
                  full_name: e.target.value,
                });
              }}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              onChange={(e) => {
                setDataRegis({ ...dataRegis, email: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => {
              setDataRegis({ ...dataRegis, password: e.target.value });
            }}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be more than 6 characters long
          </Form.Text>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            {isLoading ? (
                <Button variant="primary" disabled>
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterForm;
