import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Comment from "./Comment";
import SpinnerSmall from "../spinner/SpinnerSmall";

import { getPostById } from "../../actions/post";
import CommentForm from "./CommentForm";


// TODO - render delete comment modal on this same component
class Post extends Component {
   componentDidMount() {
      this.props.getPostById(this.props.match.params.id);
   }

   render() {
      // TODO - show spinner if comments are not loaded / Might BE DONE
      const { post, loading } = this.props.post;

      return ( loading ? <SpinnerSmall/> : post !== null ?
            <Fragment>
               <Link to="/posts" className="btn">Back To Posts</Link>
               <div className="post bg-white p-1 my-1">
                  <div>
                     <Link to={`/profiles/${post.user}`}>
                        {/* todo - change gravatar link */}
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
                  </div>
               </div>

               <CommentForm postId={this.props.match.params.id}/>

               <div className="comments">
                  {
                     post.comments.length > 0 ?
                        post.comments.map(comment => (
                           <Comment postId={post._id} key={comment._id} comment={comment}/>
                        )) :
                        <div className="post bg-white p-1 my-2">
                           <h3>No Comments on this post</h3>
                        </div>
                  }
               </div>
            </Fragment> :
            <Fragment>
               <h1>An Error Occured while fething the Post for this user</h1>
               <Link to="/posts" className="btn btn-dark"><h3>Back to Posts</h3></Link>
            </Fragment>
      );
   }
}

Post.propTypes = {
   getPostById: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ( {
   post: state.post
} );

export default connect(
   mapStateToProps,
   { getPostById }
)(Post);
