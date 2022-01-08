import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { UserContext } from "../App";

const TableCom = () => {
  const { users, setUser } = useContext(UserContext);
  const editClickHanler=(v)=>setUser(v);

  return (
    <div className="rounded">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e,i) => (
            <tr key={i}>
              <td>{e._id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>
                <Button onClick={() => editClickHanler(e)} variant="dark">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableCom;
