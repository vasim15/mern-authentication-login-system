import React, {useContext} from 'react'
import { Card,Button } from "react-bootstrap";
import { UserContext } from '../App'


const AboutUs = () => {
  const { about } = useContext(UserContext);

    return (
      <div>
        <Card>
          <Card.Header>
            <h1>About Us</h1>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <Card className="text-center">
                <Card.Header>Welcome</Card.Header>
                <Card.Body>
                  <Card.Title>name: {about?.name}</Card.Title>
                  <Card.Text>email: {about?.email}</Card.Text>
                  <Button variant="primary">{about?.role}</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {" "}
                  {about?.createdAt}
                </Card.Footer>
              </Card>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    );
}

export default AboutUs
