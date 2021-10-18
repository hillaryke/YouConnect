import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import Modal from "../layout/Modal";

const DeleteData = ( props ) => {
   const { onClickDelete, itemTitle, onCancelGoTo } = props;

   const renderActions = () => {
      return (
         <Fragment>
            <button onClick={() => onClickDelete(props)}
                    className="ui negative button">Delete
            </button>
            <Link to={onCancelGoTo} className="ui button">Cancel</Link>
         </Fragment>
      );
   };

   const renderContent = () => {
      return (
         <Fragment>
            <h4 className="header">
               Note: This is action is irreversible. Are sure you want to proceed?
            </h4>
         </Fragment>
      );
   };

   return (
      <Modal
         title={`Delete ${itemTitle}`}
         content={renderContent()}
         actions={renderActions()}
         onCancelGoTo={onCancelGoTo}
      /> );
};

export default withRouter(DeleteData);
