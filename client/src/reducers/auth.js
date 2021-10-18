import {
   AUTH_ERROR,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_FAIL,
   REGISTER_SUCCESS, SUBMITTING,
   USER_LOADED
} from "../actions/types";

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   loading: true,
   submitting: false,
   user: null
};

const authReducer = ( state = initialState, action ) => {
   switch (action.type) {
      case USER_LOADED:
         return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            loading: false
         };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem('token', action.payload.token);
         return {
            ...state,
            ...action.payload,
            loading: false,
            submitting: false
         };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
         localStorage.removeItem('token');
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            submitting: false,
            user: null
         };
      case SUBMITTING:
         return {
            ...state,
            submitting: true
         };
      default:
         return state;
   }
};

export default authReducer;