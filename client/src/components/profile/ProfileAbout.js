import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ( { profile } ) => {
   return (
      <div className="profile-about bg-light p-2">
         <h2 className="text-primary">{profile.user.name.trim().split(' ')[0]}'s Bio</h2>
         <p>{profile.bio}</p>
         <div className="line"/>
         <h2 className="text-primary">Skill Set</h2>
         <div className="skills">
            {
               profile.skills.map(( skill, index ) => (
                  <div key={index} className="p-1"><i className="fa fa-check"/> {skill}</div>
               ))
            }
         </div>
      </div>
   );
};

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
