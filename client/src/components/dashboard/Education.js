import React, { Fragment } from 'react';
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { deleteEducation } from "../../actions/profile";
import DeleteEducation from "./DeleteData";

const Education = ( { education, deleteEducation, path, matched_id } ) => {
   const renderEducation = () => {
      return education.map(( { school, degree, to, from, _id } ) => {
         return (
            <tr key={_id}>
               <td>{school}</td>
               <td className="hide-sm">{degree}</td>
               <td className="hide-sm">
                  <Moment format="DD-MM-YYYY">{from}</Moment>{' - '}
                  {!to ? ( 'Now' ) : ( <Moment format="DD-MM-YYYY">{to}</Moment> )}
               </td>
               <td>
                  <Link to={`/dashboard/education/${_id}`} className="btn btn-danger">
                     Delete
                  </Link>
               </td>
            </tr>
         );
      });
   };

   const renderDeleteModal = () => {
      const onClickDelete = ( { history, id } ) => {
         deleteEducation(history, id);
      };

      const edu = education.find(edu => edu._id === matched_id);

      return ( edu && path === '/dashboard/education/:id' && (
         <DeleteEducation
            onClickDelete={onClickDelete}
            itemTitle="Education Profile"
            id={matched_id}
            onCancelGoTo="/dashboard"
         />
      ) );
   };

   return (
      <Fragment>
         <h2 className="my-2">Education Credentials</h2>

         <table className="table">
            <thead>
            <tr>
               <th>School</th>
               <th className="hide-sm">Degree</th>
               <th className="hide-sm">Years</th>
               <th/>
            </tr>
            </thead>

            <tbody>
            {renderEducation()}
            </tbody>
         </table>
         {renderDeleteModal()}
      </Fragment>
   );
};

Education.propTypes = {
   education: PropTypes.array.isRequired,
};

export default connect(null, { deleteEducation })(Education);
