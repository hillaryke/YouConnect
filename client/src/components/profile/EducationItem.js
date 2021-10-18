import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const EducationItem = ( { edu } ) => {
   return (
      <div>
         <h3 className="text-dark">{edu.school}</h3>
         <p>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment>
            {' - '}
            {
               edu.to === null ? 'Current' :
                  <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            }
         </p>
         <p><strong>Degree: </strong>{edu.degree}</p>
         <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
         <p><strong>Description: </strong>{edu.description}</p>
      </div>
   );
};

EducationItem.propTypes = {
   edu: PropTypes.object.isRequired,
};

export default EducationItem;
