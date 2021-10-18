import React, { Fragment } from "react";
import spinner from "./lader.gif";

const SpinnerSmall = () => (
   <Fragment>
      <img
         src={spinner}
         style={{ width: '200px', margin: 'auto', display: 'block' }}
         alt="Loading..."
      />
   </Fragment>
);

export default SpinnerSmall;