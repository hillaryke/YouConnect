import React from 'react';
import PropTypes from 'prop-types';
import EducationItem from "./EducationItem";

const Education = ( { education } ) => {
   return (
      <div className="profile-edu bg-white p-2">
         <h2 className="text-primary">Education</h2>

         {education.length > 0 ?
            education.map(edu => (
               <EducationItem key={edu._id} edu={edu}/>
            )) : <h3>No Education credentials</h3>
         }
      </div>

   );
};

Education.propTypes = {
   education: PropTypes.array.isRequired,
};

export default Education;
