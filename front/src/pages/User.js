import React, { useContext } from 'react'
import Table from '../components/Table'
import Model from '../components/Model'
import { Card } from 'react-bootstrap'
import UserForm from '../components/UserForm'
import { UserContext } from '../App'

const User = () => {
    const {user, setUser} = useContext(UserContext);
    return (
      <div>
          <Card>
            <Card.Header>
              <h1>Users</h1>
            </Card.Header>
            <Card.Body>
              <Model open={!!user} setOpen={() => setUser(null)}>
                <UserForm />
              </Model>
              <Table />
            </Card.Body>
          </Card>
        
      </div>
    );
}

export default User
