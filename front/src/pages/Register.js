import { useState, useContext } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext, url } from "../App";

const Register = () => {
  const { setAuthData } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  const submitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    fetch(url+"/api/register", {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => e.json())
      .then((d) => {
        if (d.access_token) {
          localStorage.setItem("accessToken", d.access_token);
          setAuthData({ isAuth: true });
        }
      })
      .catch((er) => console.log(er));
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 6 }}>
            <Card className=" my-5">
              <Card.Header>
                <h1>Register</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler} noValidate validated={validated}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter email"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a email.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={registerData.password}
                      required
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      value={registerData.repeat_password}
                      required
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          repeat_password: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <Form.Text className="text-danger">
                      confirm password must same as password
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Please enter a confirm password.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-end"
                    controlId="formBasicCheckbox"
                  >
                    <Link
                      className="text-dark text-decoration-none "
                      to="/login"
                    >
                      Already Sign in
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

export default Register;
