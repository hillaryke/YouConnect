import axios from "axios";
import {
   AUTH_ERROR, CLEAR_PROFILE, LOADING,
   LOGIN_FAIL,
   LOGIN_SUCCESS, LOGOUT,
   REGISTER_FAIL,
   REGISTER_SUCCESS, SUBMITTING,
   USER_LOADED
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {

   if (localStorage.token) {
      setAuthToken(localStorage.token);
   }

   try {
      const { data } = await axios.get('/api/auth');
      dispatch({
         type: USER_LOADED,
         payload: data
      });

   } catch (err) {
      dispatch({ type: AUTH_ERROR });
   }
};

// Register User
export const registerUser = ( { name, email, password } ) => async dispatch => {
   dispatch({ type: SUBMITTING });
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({ name, email, password });

      const res = await axios.post('/api/users', body, config);

      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({ type: REGISTER_FAIL });
   }
};


// Login User
export const loginUser = ( email, password ) => async dispatch => {
   dispatch({ type: LOADING });
   dispatch({ type: SUBMITTING });
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({ email, password });

      const { data } = await axios.post('/api/auth', body, config);

      dispatch({
         type: LOGIN_SUCCESS,
         payload: data
      });

      dispatch(loadUser());

   } catch (err) {
      dispatch({ type: LOGIN_FAIL });

      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      }
   }
};

// Logout
export const logout = ( history ) => dispatch => {
   dispatch({ type: CLEAR_PROFILE });
   dispatch({ type: LOGOUT });
   if (history) history.push('/');
};

