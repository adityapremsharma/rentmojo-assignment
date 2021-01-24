import React from "react";
import Row from "./Row";
import RowHeading from "./RowHeading";

import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

const UsersList = ({ users, getRoute }) => {
  return (
    <Table striped bordered hover variant="dark" className="container">
      <thead>
        <RowHeading name="Name" company="Company" posts="Blogposts" />
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <Row
              key={user.id}
              title={user.name}
              description={user.company.name}
              posts={user.website}
              href={user.id}
              getRoute={getRoute}
              link="/posts"
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default UsersList;
