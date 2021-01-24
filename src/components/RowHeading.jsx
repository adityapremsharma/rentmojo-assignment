import React from "react";

const RowHeading = (props) => {
  return (
    <tr>
      <th>{props.name}</th>
      <th>{props.company}</th>
      <th>{props.posts}</th>
    </tr>
  );
};

export default RowHeading;
