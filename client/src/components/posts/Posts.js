import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import SpinnerSmall from "../spinner/SpinnerSmall";
import PostItem from "./PostItem";
import { getPosts, addPost } from "../../actions/post";

class Posts extends Component {
   state = { text: '' };

   componentDidMount() {
      this.props.getPosts();
   }

   onFormSubmit = e => {
      e.preventDefault();
      this.props.addPost(this.state.text);

      // todo - clear text after submit
      this.setState({ text: '' });
   };

   render() {
      const { posts, loading, submitting } = this.props.post;

      return (
         <Fragment>
            <h1 className="large text-primary">
               Posts
            </h1>
            <p className="lead"><i className="fas fa-user"/> Welcome to the community!</p>

            <div className="post-form">
               <div className="bg-primary p">
                  <h3>Say Something...</h3>
               </div>
               <form onSubmit={e => this.onFormSubmit(e)} className="form my-1">
                  <textarea
                     name="text"
                     cols="30"
                     rows="5"
                     placeholder="Create a post"
                     value={this.state.text}
                     onChange={e => this.setState({ text: e.target.value })}
                     disabled={submitting}
                     required
                  />
                  <input type="submit" className="btn btn-dark my-1" value="Submit"/>
               </form>
            </div>


            <div className="posts">
               {loading ? <SpinnerSmall/> :
                  posts.length > 0 ?
                     posts.map(post => (
                        <PostItem key={post._id} post={post}/>
                     ))
                     :
                     <div className="post bg-white p-1 my-1">
                        <h3>No Posts Currently</h3>
                     </div>
               }
            </div>
         </Fragment>
      );
   }
}

Posts.propTypes = {
   getPosts: PropTypes.func.isRequired,
   addPost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ( {
   post: state.post,
} );

export default connect(
   mapStateToProps,
   { getPosts, addPost }
)(Posts);
