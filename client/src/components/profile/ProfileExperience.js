import React from 'react';
import PropTypes from 'prop-types';
import ExperienceItem from "./ExperienceItem";

const Experience = ( { experiences } ) => {
   return (
      <div className="profile-exp bg-white p-2">
         <h2 className="text-primary">Experience</h2>

         {experiences.length > 0 ?
            experiences.map(exp => (
               <ExperienceItem key={exp._id} experience={exp}/>
            )) : <h3>No Experience credentials</h3>
         }
      </div>

   );
};

Experience.propTypes = {
   experiences: PropTypes.array.isRequired,
};

export default Experience;
