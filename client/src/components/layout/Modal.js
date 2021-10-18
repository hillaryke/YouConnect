import React from 'react';
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

const Modal = props => {
   return ReactDOM.createPortal(
      <div onClick={() => props.history.push(props.onCancelGoTo)} className="ui dimmer modals visible active">
         <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
            <div className="header">{props.title}</div>
            <div className="content">{props.content}</div>
            <div className="actions">{props.actions}</div>
         </div>
      </div>,
      document.querySelector('#modal'));
};

export default withRouter(Modal);
