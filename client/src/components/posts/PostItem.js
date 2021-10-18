import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getPostById, getPosts, addLike, removeLike } from "../../actions/post";

class PostItem extends Component {

   // TODO - show delete post modal on the same page as Posts
   render() {
      const { post, auth } = this.props;
      return (
         <div className="post bg-white p-1 my-1">
            <div>
               <Link to={`/profiles/${post.user}`}>
                  {/* todo - replace gravatar link below with dynamic link */}
                  <img
                     className="round-img"
                     src={post.avatar}
                     alt=""
                  />
                  <h4>{post.name}</h4>
               </Link>
            </div>
            <div>
               <p className="my-1">{post.text}</p>
               <p className="post-date">
                  Posted on <Moment format="DD/MM/YY">{post.data}</Moment>
               </p>
               <button
                  onClick={() => this.props.addLike(post._id)}
                  type="button"
                  className="btn btn-light"
               >
                  <i className="fas fa-thumbs-up"/>{' '}
                  {post.likes.length > 0 &&
                  <span>{post.likes.length}</span>
                  }
               </button>
               <button
                  onClick={() => this.props.removeLike(post._id)}
                  type="button"
                  className="btn btn-light"
               >
                  <i className="fas fa-thumbs-down"/>
               </button>
               <Link to={`/posts/${post._id}`} className="btn btn-primary">
                  Discussion{' '}
                  {post.comments.length > 0 &&
                  <span className="comment-count">{post.comments.length}</span>
                  }
               </Link>
               {!auth.loading && auth.user._id === post.user && (
                  <Link to={`/delete/post/${post._id}`} type="button" className="btn btn-danger">
                     Delete
                     {/*<i className="fas fa-times"/>*/}
                  </Link>
               )}
            </div>
         </div>
      );
   }
}

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   addLike: PropTypes.func.isRequired,
   removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ( {
   auth: state.auth,
} );

export default connect(
   mapStateToProps,
   { getPostById, getPosts, addLike, removeLike }
)(PostItem);
