import {
   ADD_COMMENT,
   CLEAR_POST, DELETE_COMMENT,
   GET_POST,
   GET_POSTS,
   LOADING_POSTS,
   ADD_POST,
   DELETE_POST,
   POST_ERROR, UPDATE_LIKES, SUBMITTING_COMMENT,
   SUBMITTING_POST, AUTH_ERROR
} from "../actions/types";

const INITIAL_STATE = {
   post: null,
   posts: [],
   loading: true,
   submitting: false,
   error: {}
};

const postReducer = ( state = INITIAL_STATE, action ) => {
   const { type, payload } = action;

   switch (type) {
      case GET_POSTS:
         return {
            ...state,
            posts: payload,
            loading: false
         };
      case GET_POST:
         return {
            ...state,
            post: payload,
            loading: false
         };
      case ADD_POST:
         return {
            ...state,
            posts: [payload, ...state.posts],
            loading: false,
            submitting: false
         };
      case CLEAR_POST:
         return {
            ...state,
            post: null
         };
      case SUBMITTING_COMMENT:
      case SUBMITTING_POST:
         return {
            ...state,
            submitting: true
         };
      case LOADING_POSTS:
         return {
            ...state,
            loading: true
         };
      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter(post => post._id !== payload),
            loading: false
         };
      case ADD_COMMENT:
         return {
            ...state,
            post: state.post._id === payload.postId ? {
               ...state.post, comments: payload.comments
            } : null,
            loading: false,
            submitting: false
         };
      case DELETE_COMMENT:
         return {
            ...state,
            post: state.post._id === payload.postId ? {
               ...state.post,
               comments: state.post.comments.filter(comment => comment._id !== payload.commentId)
            } : null,
            loading: false,
         };
      case UPDATE_LIKES:
         return {
            ...state,
            posts: state.posts.map(post => ( post._id === payload.postId ) ?
               { ...post, likes: payload.likes } : post),
            loading: false,
            submitting: false,
         };

      case POST_ERROR:
         return {
            ...state,
            loading: false,
            submitting: false,
            error: payload
         };
      case AUTH_ERROR:
         return {
            ...state,
            loading: false,
         };
      default:
         return state;
   }
};

export default postReducer;