import React, { Fragment, useState } from 'react';
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";

import { loginUser } from "../../actions/auth";

import PropTypes from "prop-types";

const Login = ( { loginUser, isAuthenticated, submitting } ) => {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });

   const { email, password } = formData;

   const onInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onFormSubmit = event => {
      event.preventDefault();

      loginUser(email, password);
   };

   // Redirect if logged in
   if (isAuthenticated) {
      return <Redirect to="/dashboard"/>;
   }

   return (
      <Fragment>
         <h1 className="large text-primary">Sign In</h1>
         <p className="lead"><i className="fas fa-user"/> Sign into Your Account</p>
         <form className="form" action="/create-profile" onSubmit={event => onFormSubmit(event)}>
            <div className="form-group">
               <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onInputChange(e)}
                  disabled={submitting}
                  required
               />
            </div>
            <div className="form-group">
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={e => onInputChange(e)}
                  disabled={submitting}
                  required
               />
            </div>
            <input type="submit" className="btn btn-primary" value="Login"/>
         </form>
         <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
         </p>
      </Fragment>
   );
};

Login.propTypes = {
   loginUser: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool,
   submitting: PropTypes.bool,
};

const mapStateToProps = state => ( {
   isAuthenticated: state.auth.isAuthenticated,
   submitting: state.auth.submitting
} );

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
