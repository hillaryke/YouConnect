import React, { Fragment, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerUser } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ( { setAlert, registerUser, isAuthenticated } ) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   });

   const { name, email, password, password2 } = formData;

   const onInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onFormSubmit = event => {
      event.preventDefault();

      if (password !== password2) {
         setAlert('Passwords do not match', 'danger');
      } else {
         registerUser({ name, email, password });
      }
   };

   if (isAuthenticated) {
      return <Redirect to="/dashboard"/>;
   }

   return (
      <Fragment>
         <h1 className="large text-primary">Sign Up</h1>
         <p className="lead"><i className="fas fa-user"/> Create Your Account</p>
         <form className="form" action="create-profile.html" onSubmit={event => onFormSubmit(event)}>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onInputChange(e)}
               />
               <small className="form-text"
               >This site uses Gravatar so if you want a profile image, use a
                  Gravatar email</small
               >
            </div>
            <div className="form-group">
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <input type="submit" className="btn btn-primary" value="Register"/>
         </form>
         <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
         </p>
      </Fragment>
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   registerUser: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ( {
   isAuthenticated: state.auth.isAuthenticated
} );

export default connect(
   mapStateToProps,
   { setAlert, registerUser }
)(Register);
