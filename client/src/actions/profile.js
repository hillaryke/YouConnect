import axios from "axios";
import { setAlert } from "./alert";
import {
   CLEAR_PROFILE,
   CREATE_PROFILE,
   ACCOUNT_DELETED,
   GET_PROFILE,
   LOGOUT,
   PROFILE_ERROR,
   UPDATE_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_CLEAR, LOADING
} from "./types";

// Get all profiles
export const getAllProfiles = () => async dispatch => {
   dispatch({ type: PROFILE_CLEAR });
   dispatch({ type: LOADING });

   try {
      const { data } = await axios.get('/api/profile');
      dispatch({ type: GET_PROFILES, payload: data });

   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Get Profile by User Id
export const getProfileById = ( userId ) => async dispatch => {
   dispatch({ type: CLEAR_PROFILE });
   dispatch({ type: LOADING });

   try {
      const { data } = await axios.get(`/api/profile/user/${userId}`);
      dispatch({ type: GET_PROFILE, payload: data });

   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Get Github repos for Current User
export const getUserRepos = ( githubusername ) => async dispatch => {

   try {
      const { data } = await axios.get(`/api/profile/github/${githubusername}`);
      dispatch({ type: GET_REPOS, payload: data });

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
   dispatch({ type: LOADING });

   try {
      const { data } = await axios.get('/api/profile/me');
      dispatch({ type: GET_PROFILE, payload: data });

   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Create or update a profile
export const createProfile = ( formData, edit = false, history ) => async dispatch => {
   dispatch({ type: LOADING });

   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const body = JSON.stringify(formData);

      const { data } = await axios.post('/api/profile', body, config);

      dispatch({ type: CREATE_PROFILE, payload: data });

      if (!edit) {
         dispatch(setAlert('Profile Created Successfully', 'success'));
         history.push('/dashboard');
      } else {
         dispatch(setAlert('Profile Updated!', 'success'));
      }

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Add profile experience
export const addExperience = ( formData, history ) => async dispatch => {
   dispatch({ type: LOADING });

   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify(formData);

      const { data } = await axios.put('/api/profile/experience', body, config);

      dispatch({ type: UPDATE_PROFILE, payload: data });

      dispatch(setAlert('Experience Profile added successfully', 'success'));

      history.push('/dashboard');

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Add education profile
export const addEducation = ( formData, history ) => async dispatch => {
   dispatch({ type: LOADING });
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const body = JSON.stringify(formData);

      const { data } = await axios.put('/api/profile/education', body, config);

      dispatch({ type: UPDATE_PROFILE, payload: data });

      dispatch(setAlert('Successfully added Education Profile', 'success'));

      history.push('/');
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Delete Profile experience
export const deleteExperience = ( history, id ) => async dispatch => {
   dispatch({ type: LOADING });
   try {
      const { data } = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({ type: UPDATE_PROFILE, payload: data });

      history.push('/dashboard');

      dispatch(setAlert('Experience Removed!', 'danger'));

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }

};

// Delete Profile experience
export const deleteEducation = ( history, id ) => async dispatch => {
   dispatch({ type: LOADING });
   try {
      const { data } = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });

      history.push('/dashboard');

      dispatch(setAlert('Education  Removed!', 'danger'));

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }

};


//DELETE ACCOUNT and PROFILE
export const deleteAccount = ( history ) => async dispatch => {
   dispatch({ type: LOADING });

   try {
      const { data: { msg } } = await axios.delete('/api/profile');

      dispatch({ type: ACCOUNT_DELETED });
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: LOGOUT });

      history.push('/');

      dispatch(setAlert(msg.toUpperCase(), 'danger'));
      dispatch(setAlert('YOUR ACCOUNT HAS BEEN PERMANENTLY DELETED!', 'danger'));

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
         });
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};
