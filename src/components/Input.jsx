import React from "react";

import { InputGroup, FormControl } from "react-bootstrap";

const Input = (props) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        onChange={props.onChange}
        placeholder="Filter"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
    </InputGroup>
  );
};

export default Input;
