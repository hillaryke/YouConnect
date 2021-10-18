import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";

const AddExperience = ( { addExperience, history } ) => {
   const [formData, setFormData] = useState({
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
   });

   const [toDateDisabled, toggleToDateDisabled] = useState(false);

   const onInputChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onCheckboxChange = e => {
      setFormData({ ...formData, current: !current });

      toggleToDateDisabled(!toDateDisabled);
   };


   const onFormSubmit = e => {
      e.preventDefault();

      addExperience(formData, history);
   };

   const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
   } = formData;

   return (
      <Fragment>
         <h1 className="large text-primary">
            Add An Experience
         </h1>
         <p className="lead">
            <i className="fas fa-code-branch"/> Add any developer/programming
            positions that you have had in the past
         </p>
         <small>* = required field</small>
         <form className="form" onSubmit={e => onFormSubmit(e)}>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  required
                  value={title}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <h4>From Date</h4>
               <input
                  type="date"
                  name="from"
                  value={from}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <p>
                  <input
                     type="checkbox"
                     name="current"
                     checked={current}
                     value={current}
                     onChange={e => onCheckboxChange(e)}
                  /> {' '} Current Job</p>
            </div>
            <div className="form-group">
               <h4>To Date</h4>
               <input
                  type="date"
                  name="to"
                  value={to}
                  onChange={e => onInputChange(e)}
                  disabled={toDateDisabled ? "disabled" : ''}
               />
            </div>
            <div className="form-group">
             <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                onChange={e => onInputChange(e)}
             />
            </div>
            <input type="submit" className="btn btn-primary my-1"/>
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
         </form>
      </Fragment>

   );
};

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
};

export default connect(
   null,
   { addExperience }
)(withRouter(AddExperience));
