import React from "react";
import Link from "./Link";

const Row = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.description}</td>
      <td
        onClick={() => {
          return props.getRoute(props.href);
        }}
      >
        <Link href={props.link}>{props.posts}</Link>
      </td>
    </tr>
  );
};

export default Row;
