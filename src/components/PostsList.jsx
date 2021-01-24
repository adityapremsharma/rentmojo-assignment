import React from "react";
import Row from "./Row";
import RowHeading from "./RowHeading";

import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

const PostsList = ({ users, getRoute }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <RowHeading name="Title" company="Body" posts="URL" />
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <Row
              key={user.id}
              title={user.title}
              description={user.body}
              posts="More Details"
              href={user.id}
              getRoute={getRoute}
              link="/postdetails"
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default PostsList;
