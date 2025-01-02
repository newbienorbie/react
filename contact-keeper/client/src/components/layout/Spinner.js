import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  // if there's no other code at the top we can remove return(), straight to the thing we want to return
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);

export default Spinner;
