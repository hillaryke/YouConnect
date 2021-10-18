import axios from "axios";

const setAuthToken = ( token ) => {
   // set global headers with token if it exists in localStorage
   // otherwise delete it
   if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
   } else {
      delete axios.defaults.headers.common['x-auth-token'];
   }
};

export default setAuthToken;