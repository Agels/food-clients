// /* eslint-disable jsx-a11y/anchor-is-valid */
// import {
//     Navbar,
//     Container,
//     Button,
//     Modal,
//     Form,
//     NavDropdown,
//   } from "react-bootstrap";
//   import Swal from "sweetalert2";
//   import { useState } from "react";
//   import Register from "../user/register";
//   import Login from "../user/login/index";
//   import { userLogin, userLogout } from "../../app/auth/actions";
//   import { useDispatch, useSelector } from "react-redux";
//   import { useNavigate } from "react-router";
//   import { logout } from "../user/logout";
//   import LoginForm from '../user/login/login';
//   const Navbars = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const user = useSelector((state) => state.auth);
   
//     const [show, setShow] = useState(false);
//     const [dataRegis, setDataRegis] = useState({
//       full_name: "",
//       email: "",
//       password: "",
//     });
  
//     const [signupError, setSignupError] = useState([]);
//     const [signinError, setSigninError] = useState([]);
//     const [dataLogin, setDataLogin] = useState({
//       email: "",
//       password: "",
//     });
//     const [showRegis, setRegis] = useState(false);
//     const handleClose = () => {
//       setShow(false);
//       setRegis(false);
//     };
//     const handleShow = () => setShow(true);
//     const handleRegis = (e) => {
//       e.preventDefault();
//       setShow(false);
//       setRegis(true);
//     };
  
//     const submitRegis = async (e) => {
//       e.preventDefault();
//       const error = [];
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//       const { full_name, email, password } = dataRegis;
//       if (full_name.length === 0) {
//         error.push("full Name cannot be null");
//       }
//       if (email.length === 0) {
//         error.push("email cannot be null");
//       } else if (!emailRegex.test(email)) {
//         error.push("type email only");
//       }
  
//       if (password.length === 0) {
//         error.push("password cannot be null");
//       } else if (password.length < 6) {
//         error.push("password must more than 6");
//       }
  
//       if (error.length > 0) {
//         setSignupError(error);
//       } else {
//         setSignupError([]);
//         const payload = {
//           full_name: full_name,
//           email: email,
//           password: password,
//         };
  
//         await Register(payload);
//         handleClose();
//         Swal.fire({
//           text: "Register Success",
//           icon: "success",
//           toast: true,
//           position: "top-right",
//           timerProgressBar: true,
//           showConfirmButton: false,
//           timer: 1500,
//         });
  
//         const payloadx = {
//           email: email,
//           password: password,
//         };
//         const { data } = await Login(payloadx);
//         console.log(data)
//         if (data) {
//           const setLocal = {
//             user : data.user,
//             token:data.token
//           }
//           dispatch(userLogin(data));
//           localStorage.setItem("auth", JSON.stringify(setLocal));
//         }
//       }
//     };
  
//     const submitLogin = async (e) => {
//       e.preventDefault();
//       const error = [];
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//       const { email, password } = dataLogin;
//       if (email.length === 0) {
//         error.push("email cannot be null");
//       } else if (!emailRegex.test(email)) {
//         error.push("type email only");
//       }
  
//       if (password.length === 0) {
//         error.push("password cannot be null");
//       }
  
//       if (error.length > 0) {
//         setSigninError(error);
//       } else {
//         setSigninError([]);
//         handleClose();
//         const payload = {
//           email: email,
//           password: password,
//         };
//         const { data } = await Login(payload);
//         if (data.message === "Login Succesfully") {
//           Swal.fire({
//             text: "Login Success",
//             icon: "success",
//             toast: true,
//             position: "top-right",
//             timerProgressBar: true,
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           if (data) {
//             dispatch(userLogin(data));
//             localStorage.setItem("auth", JSON.stringify(data));
//           }
//         } else {
//           Swal.fire({
//             text: "Login Gagal",
//             icon: "warning",
//             toast: true,
//             position: "top-right",
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         }
//       }
//     };
//     const logoutUser = () => {
//       dispatch(userLogout());
//       logout();
//       Swal.fire({
//         text: "Logout",
//         icon: "success",
//         toast: true,
//         position: "top",
//         timerProgressBar: true,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       navigate("/");
//     };
//     const profilUser = () => {
//       navigate('profil')
//     } 
//     const style = {
//       backgroundColor: "#fb8500",
//       color: "white",
//       border: "0",
//     };
//     return (
//       <Navbar>
//         <Container>
//           <Navbar.Brand href="#home">FOOD STORE</Navbar.Brand>
//           <Navbar.Toggle />
//           <Navbar.Collapse className="justify-content-end">
//             <Navbar.Text>
//               {!user.user ? (
//                 <Button style={style} onClick={handleShow}>
//                   <i className="fa-solid fa-user"></i> Sign in
//                 </Button>
//               ) : (
//                 <NavDropdown
//                   title={user?.user?.full_name}
//                   id="basic-nav-dropdown"
//                 >
//                   <NavDropdown.Item href="#" onClick={profilUser}>Profile</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#" onClick={logoutUser}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               )}
//               <LoginForm isModalVisisble={show} handleClose={handleClose} />
//               {/* <RegisterForm /> */}
//               {/* <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Login</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {signinError.map((e, index) => (
//                     <div key={index} className="text-danger">
//                       * {e}
//                     </div>
//                   ))}
//                   <Form onSubmit={submitLogin}>
//                     <Form.Group
//                       className="mb-3"
//                       controlId="exampleForm.ControlInput1"
//                     >
//                       <Form.Label>Email address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder=""
//                         autoFocus
//                         onChange={(e) => {
//                           setDataLogin({ ...dataLogin, email: e.target.value });
//                         }}
//                       />
//                     </Form.Group>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       id="inputPassword5"
//                       aria-describedby="passwordHelpBlock"
//                       onChange={(e) => {
//                         setDataLogin({ ...dataLogin, password: e.target.value });
//                       }}
//                     />
//                     <Form.Text id="passwordHelpBlock" muted>
//                       Your password must be 8-20 characters long
//                     </Form.Text>
  
//                     <Modal.Footer>
//                       <p className="text-start">New to FoodStore ?</p>
//                       <a href="#" onClick={handleRegis}>
//                         Sign Up
//                       </a>
//                       <Button variant="secondary" onClick={handleClose}>
//                         Close
//                       </Button>
//                       <Button variant="primary" type="submit">
//                         Submit
//                       </Button>
//                     </Modal.Footer>
//                   </Form>
//                 </Modal.Body>
//               </Modal> */}
//               {/* <Modal show={showRegis} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Register</Modal.Title>
//                 </Modal.Header>
  
//                 <Modal.Body>
//                   {signupError.map((e, index) => (
//                     <div key={index} className="text-danger">
//                       * {e}
//                     </div>
//                   ))}
//                   <Form onSubmit={submitRegis}>
//                     <Form.Group
//                       className="mb-3"
//                       controlId="exampleForm.ControlInput1"
//                     >
//                       <Form.Label>Full Name</Form.Label>
  
//                       <Form.Control
//                         type="text"
//                         placeholder=""
//                         onChange={(e) => {
//                           setDataRegis({
//                             ...dataRegis,
//                             full_name: e.target.value,
//                           });
//                         }}
//                         autoFocus
//                       />
//                     </Form.Group>
  
//                     <Form.Group
//                       className="mb-3"
//                       controlId="exampleForm.ControlInput1"
//                     >
//                       <Form.Label>Email address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder=""
//                         onChange={(e) => {
//                           setDataRegis({ ...dataRegis, email: e.target.value });
//                         }}
//                       />
//                     </Form.Group>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       id="inputPassword5"
//                       aria-describedby="passwordHelpBlock"
//                       onChange={(e) => {
//                         setDataRegis({ ...dataRegis, password: e.target.value });
//                       }}
//                     />
//                     <Form.Text id="passwordHelpBlock" muted>
//                       Your password must be more than 6 characters long
//                     </Form.Text>
//                     <Modal.Footer>
//                       <Button variant="secondary" onClick={handleClose}>
//                         Close
//                       </Button>
//                       <Button variant="primary" type="submit">
//                         Sumbit
//                       </Button>
//                     </Modal.Footer>
//                   </Form>
//                 </Modal.Body>
//               </Modal> */}
//             </Navbar.Text>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     );
//   };
//   export default Navbars;
  