import React from 'react';
import { connect } from "react-redux";
import DeletePost from "../dashboard/DeleteData";
import { deletePost, deleteComment } from "../../actions/post";

// TODO - refractor this component to be reusable

const DeletePage = ( props ) => {
   const { match: { params } } = props;
   const deletePostModal = () => {
      const onDeletePost = ( { history, postId } ) => {
         props.deletePost(postId);
         history.push('/posts');
      };

      const onDeleteComment = ( { history, postId, commentId } ) => {
         props.deleteComment(postId, commentId, history);
      };

      return ( params.commentId && params.postId ?
            <DeletePost
               onClickDelete={onDeleteComment}
               itemTitle="Comment"
               onCancelGoTo={`/posts/${params.postId}`}
               commentId={params.commentId}
               postId={params.postId}
            /> :
            <DeletePost
               onClickDelete={onDeletePost}
               itemTitle="Post"
               onCancelGoTo="/posts"
               postId={params.id}
            />
      );
   };

   return (
      <div>
         {deletePostModal()}
      </div>
   );
};

export default connect(
   null,
   { deletePost, deleteComment }
)(DeletePage);
