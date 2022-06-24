import { useState } from "react";
import { userLogin } from "../../../app/auth/actions";
import { useDispatch } from "react-redux";
import Login from "./index";
import Swal from "sweetalert2";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import RegisterForm from "../register/register";
const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [signinError, setSigninError] = useState([]);
  const [showRegis, setRegis] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setRegis(false);
  };

  const handleRegis = () => {
    setRegis(true);
  };
  const submitLogin = async (e) => {
    e.preventDefault();
    const error = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const { email, password } = dataLogin;
    if (email.length === 0) {
      error.push("email cannot be null");
    } else if (!emailRegex.test(email)) {
      error.push("type email only");
    }

    if (password.length === 0) {
      error.push("password cannot be null");
    }

    if (error.length > 0) {
      setSigninError(error);
    } else {
      setLoading(true);
      setSigninError([]);
     
      const payload = {
        email: email,
        password: password,
      };
      const { data } = await Login(payload);
      if (data.message === "Login Succesfully") {
        Swal.fire({
          text: "Login Success",
          icon: "success",
          toast: true,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 1500,
        });
        if (data) {
          dispatch(userLogin(data));
          localStorage.setItem("auth", JSON.stringify(data));
        }
      } else {
        Swal.fire({
          text: "Login Gagal",
          icon: "warning",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      setLoading(false);
      props.handleClose();
    }
  };
  return (
    <div>
      <Modal show={props.isModalVisisble} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {signinError.map((e, index) => (
            <div key={index} className="text-danger">
              * {e}
            </div>
          ))}
          <Form onSubmit={submitLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                autoFocus
                onChange={(e) => {
                  setDataLogin({ ...dataLogin, email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => {
                setDataLogin({ ...dataLogin, password: e.target.value });
              }}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long
            </Form.Text>

            <Modal.Footer>
              <p className="text-start">New to FoodStore ?</p>
              <a
                href="#/"
                onClick={() => {
                  handleRegis();
                  props.handleClose();
                }}
              >
                Sign Up
              </a>
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
      <RegisterForm isModalVisisble={showRegis} handleClose={handleClose} />
    </div>
  );
};

export default LoginForm;
