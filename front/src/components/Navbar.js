import React, {useContext} from 'react'
import { Navbar, Container, Nav, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

const NavbarCom = () => {
  const {setAuthData} = useContext(AuthContext);
  const logoutHandler=()=>{
    localStorage.clear();
    setAuthData({isAuth: false})
  }
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Task
            </Navbar.Brand>
            <Nav className="me-auto">
              
              <Nav.Link as={Link} to="/about-us">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users 
              </Nav.Link>
            </Nav>
            <Button onClick={logoutHandler} variant='danger'>Logout</Button>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavbarCom
