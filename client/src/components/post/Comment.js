import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Comment = ( { postId, comment, auth } ) => {
   return (
      <div className="post bg-white p-1 my-1">
         <div>
            <a href={`/profiles/${comment.user}`}>
               <img
                  className="round-img"
                  src={comment.avatar}
                  alt=""
               />
               <h4>{comment.name}</h4>
            </a>
         </div>
         <div>
            <p className="my-1">{comment.text}</p>
            <p className="post-date">
               Posted on <Moment format="DD/MM/YYYY">{comment.date}</Moment>
               {/* TODO - add date for comment and date for posts */}
            </p>
            {!auth.loading && comment.user === auth.user._id && (
               <Link to={`/delete/comment/${postId}/${comment._id}`} type="button" className="btn btn-danger">
                  Delete
                  {/*<i className="fas fa-times"/>*/}
               </Link>
            )}
         </div>
      </div>

   );
};

Comment.propTypes = {
   comment: PropTypes.object.isRequired,
   postId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ( {
   auth: state.auth
} );

export default connect(
   mapStateToProps
)(Comment);