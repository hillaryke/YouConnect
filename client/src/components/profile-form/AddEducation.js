import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddEducation = ( { addEducation, history } ) => {

   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
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

      addEducation(formData, history);
   };


   const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
   } = formData;

   return (
      <Fragment>
         <h1 className="large text-primary">
            Add Your Education
         </h1>
         <p className="lead">
            <i className="fas fa-graduation-cap"/> Add any school, bootcamp, etc that
            you have attended
         </p>
         <small>* = required field</small>
         <form className="form" onSubmit={e => onFormSubmit(e)}>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="* School or Bootcamp"
                  name="school"
                  required
                  value={school}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="* Degree or Certificate"
                  name="degree"
                  required
                  value={degree}
                  onChange={e => onInputChange(e)}
               />
            </div>
            <div className="form-group">
               <input
                  type="text"
                  placeholder="Field Of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
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
                  /> {' '} Current School or Bootcamp
               </p>
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
             placeholder="Program Description"
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

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
};

export default connect(
   null,
   { addEducation }
)(withRouter(AddEducation));
