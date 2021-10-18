import React, { Fragment } from "react";
import spinner from "./spinner.jpg";

const Spinner = () => (
   <Fragment>
      <img
         src={spinner}
         style={{ width: '250px', margin: 'auto', marginTop: '300px', display: 'block' }}
         alt="Loading..."
      />
   </Fragment>
);

export default Spinner;