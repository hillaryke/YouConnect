import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addComment } from "../../actions/post";

class CommentForm extends Component {
   state = { text: '' };

   onFormSubmit = e => {
      e.preventDefault();
      this.props.addComment(this.state.text, this.props.postId);
      // @todo - clear text when comment is added successfuly
   };

   componentDidUpdate( prevProps, prevState, snapshot ) {
      if (this.props.submitting
         || ( prevState.text !== this.state.text )
         || ( prevProps === this.props )) {
      } else {
         this.setState({ text: '' });
      }
   }


   render() {
      return (
         <div className="post-form">
            <div className="bg-primary p">
               <h3>Leave A Comment</h3>
            </div>
            <form onSubmit={e => this.onFormSubmit(e)} className="form my-1">
                <textarea
                   name="text"
                   cols="30"
                   rows="5"
                   placeholder="Comment on this post"
                   value={this.state.text}
                   onChange={e => this.setState({ text: e.target.value })}
                   disabled={this.props.submitting}
                   required
                />
               <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
         </div>
      );
   }
}

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired,
   submitting: PropTypes.bool.isRequired,
   postId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ( {
   submitting: state.post.submitting
} );

export default connect(
   mapStateToProps,
   { addComment }
)(CommentForm);
