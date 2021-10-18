import {
   ADD_POST,
   GET_POST,
   GET_POSTS,
   POST_ERROR,
   SUBMITTING_POST,
   DELETE_POST,
   LOADING_POSTS, ADD_COMMENT, DELETE_COMMENT, SUBMITTING_COMMENT, UPDATE_LIKES
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

// Get All Posts
export const getPosts = () => async dispatch => {
   dispatch({ type: LOADING_POSTS });
   try {
      const { data } = await axios.get('/api/posts');
      // posts returned
      dispatch({ type: GET_POSTS, payload: data });

   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Get a single Post By the Post Id
export const getPostById = ( postId ) => async dispatch => {
   dispatch({ type: LOADING_POSTS });

   try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      // post returned
      dispatch({ type: GET_POST, payload: data });

   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Create a Post
export const addPost = ( text ) => async dispatch => {
   dispatch({ type: SUBMITTING_POST });

   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({ text });
      const { data } = await axios.post('/api/posts', body, config);
      // post returned
      dispatch({
         type: ADD_POST,
         payload: data
      });
      dispatch(setAlert('Post Created!', 'success'));

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Delete a Post
export const deletePost = ( postId ) => async dispatch => {
   try {
      await axios.delete(`/api/posts/${postId}`);
      // success msg returned
      dispatch({
         type: DELETE_POST,
         payload: postId
      });
      dispatch(setAlert('Post Deleted', 'success'));

   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Add Comment to a Post
export const addComment = ( text, postId ) => async dispatch => {
   dispatch({ type: SUBMITTING_COMMENT });
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({ text });
      const { data } = await axios.post(`/api/posts/comment/${postId}`, body, config);
      // returns array of comments for current post
      dispatch({
         type: ADD_COMMENT,
         payload: {
            postId,
            comments: data
         }
      });
      dispatch(setAlert('Comment Added', 'success'));

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Delete a comment
export const deleteComment = ( postId, commentId, history ) => async dispatch => {
   try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      // returns success msg
      dispatch({
         type: DELETE_COMMENT,
         payload: {
            postId, commentId
         }
      });
      history.push(`/posts/${postId}`);
      dispatch(setAlert('Comment Deleted', 'danger'));

   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// LIke a post
export const addLike = postId => async dispatch => {
   try {
      const { data } = await axios.put(`/api/posts/like/${postId}`);
      // array of users liking the post returned
      dispatch({ type: UPDATE_LIKES, payload: { postId, likes: data } });

   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Unlike a post
export const removeLike = postId => async dispatch => {
   try {
      const { data } = await axios.put(`/api/posts/unlike/${postId}`);
      dispatch({ type: UPDATE_LIKES, payload: { postId, likes: data } });

   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};





































