import React, { useContext, useState } from 'react'
import {Form ,Button} from 'react-bootstrap'
import {UserContext} from '../App'
const UserForm = () => {
    const {user,setUsers,users, setUser} = useContext(UserContext);
    const [value, setValue] = useState(user);
    const saveHandler = (e) => {
        e.preventDefault();
        const tempUsers = users
        const index = tempUsers.findIndex(e=>e.id === value.id)
        tempUsers.splice(index,1,value)
        setUsers(tempUsers)
        setUser(null)
    };
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              value={value?.name}
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              value={value?.email}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Post</Form.Label>
            <Form.Control
              onChange={(e) => setValue({ ...value, body: e.target.value })}
              value={value?.body}
              placeholder="Post"
              as="textarea"
              rows={5}
            />
          </Form.Group>

          <div className="text-end p-2">
            <Button
              onClick={() => {
                setUser(null);
              }}
              className="m-2"
              variant="secondary"
            >
              Close
            </Button>
            <Button onClick={saveHandler} variant="primary" type="submit">
              Save changes
            </Button>
          </div>
        </Form>
      </div>
    );
}

export default UserForm
