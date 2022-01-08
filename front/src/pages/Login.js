import {useState, useContext} from "react";
import { Card, Form, Button, Container,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {AuthContext, url} from '../App'

const Login = () => {
  const {setAuthData} = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  }); 
  const submitHandler =(e)=>{
       e.preventDefault();


     const form = e.currentTarget;
     if (form.checkValidity() === false) {
       e.preventDefault();
       e.stopPropagation();
     }

     setValidated(true);
    fetch(url+"/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => {
        if (e.ok) {
          const data = e.json();
          return data;
        }
      })
      .then((d) => {
        localStorage.setItem("accessToken", d.access_token);
        setAuthData({ isAuth: true });
      })
      .catch((er) => console.log(er));
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 6 }}>
            <Card className=" my-5">
              <Card.Header>
                <h1>Login</h1>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide an email.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-end"
                    controlId="formBasicCheckbox"
                  >
                    <Link
                      className="text-dark text-decoration-none "
                      to="/register"
                    >
                      New Register
                    </Link>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
