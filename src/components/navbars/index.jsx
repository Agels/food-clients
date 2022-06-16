/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Navbar,
  Container,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from "react";

import { userLogout } from "../../app/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../user/logout";
import LoginForm from '../user/login/login';
const Navbars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const logoutUser = () => {
    dispatch(userLogout());
    logout();
    Swal.fire({
      text: "Logout",
      icon: "success",
      toast: true,
      position: "top",
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };
  const profilUser = () => {
    navigate('profil')
  } 
  const style = {
    backgroundColor: "#fb8500",
    color: "white",
    border: "0",
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="" onClick={() => navigate('/')}>FOOD STORE</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {!user.user ? (
              <Button style={style} onClick={handleShow}>
                <i className="fa-solid fa-user"></i> Sign in
              </Button>
            ) : (
              <NavDropdown
                title={user?.user?.full_name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#" onClick={profilUser}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={logoutUser}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {/* render login modal */}
            <LoginForm isModalVisisble={show} handleClose={handleClose} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navbars;
