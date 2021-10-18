import React from 'react';
import Moment from "react-moment";
import PropTypes from 'prop-types';

const ExperienceItem = ( { experience } ) => {
   return (
      <div>
         <h3 className="text-dark">{experience.company}</h3>
         <p>
            <Moment format="DD/MM/YYYY">{experience.from}</Moment>
            {' - '}
            {
               experience.to === null ? 'Current' :
                  <Moment format="DD/MM/YYYY">{experience.to}</Moment>
            }
         </p>
         <p><strong>Position: </strong>{experience.title}</p>
         <p><strong>Description: </strong>{experience.description}</p>
      </div>

   );
};

ExperienceItem.propTypes = {
   experience: PropTypes.object.isRequired,
};

export default ExperienceItem;
