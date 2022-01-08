import React from 'react'
import {Card} from 'react-bootstrap'

const Home = () => {
    return (
      <div>
        <Card>
          <Card.Header>
            <h1>Home</h1>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                just click on users link to go user list page and about us about user
              
              </p>
              <footer className="blockquote-footer">
                if any dought feel free mail on{" "}
                <cite title="Source Title">vasimzgreen@gmail.com</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    );
}

export default Home
