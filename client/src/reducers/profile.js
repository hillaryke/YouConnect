import {
   CLEAR_PROFILE,
   CREATE_PROFILE,
   ACCOUNT_DELETED,
   GET_PROFILE,
   PROFILE_ERROR,
   UPDATE_PROFILE,
   LOGOUT,
   GET_PROFILES,
   GET_REPOS, PROFILE_CLEAR, LOADING, POST_ERROR, AUTH_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
   profile: null,
   profiles: [],
   repos: [],
   loading: true,
   error: {}
};

const profileReducer = ( state = INITIAL_STATE, action ) => {
   const { type, payload } = action;
   switch (type) {
      case GET_PROFILE:
      case CREATE_PROFILE:
      case UPDATE_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false
         };
      case GET_PROFILES:
         return {
            ...state,
            profiles: payload,
            loading: false
         };
      case GET_REPOS:
         return {
            ...state,
            repos: payload,
         };

      case CLEAR_PROFILE:
      case LOGOUT:
         return {
            ...state,
            profile: null,
            repos: [],
            loading: false
         };
      case PROFILE_CLEAR:
         return {
            ...state,
            profile: null,
            repos: []
         };
      case LOADING:
         return {
            ...state,
            loading: true
         };
      case PROFILE_ERROR :
         return {
            ...state,
            loading: false,
            error: payload
         };
      case POST_ERROR:
      case AUTH_ERROR:
         return {
            ...state,
            loading: false,
         };
      case ACCOUNT_DELETED:
         return {
            profile: null,
            profiles: [],
            repos: [],
            loading: false,
            error: {}
         };

      default:
         return state;
   }
};

export default profileReducer;