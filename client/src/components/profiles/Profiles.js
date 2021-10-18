import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAllProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

class Profile extends Component {
   componentDidMount() {
      this.props.getAllProfiles();
   }

   renderProfiles = () => {
      if (this.props.profile.profiles.length > 0) {
         return this.props.profile.profiles.map(profile => {
            return ( <ProfileItem key={profile._id} profile={profile}/> );
         });
      } else {
         return <h4>No Profiles found</h4>;
      }
   };

   render() {

      return (
         this.props.profile.loading ? <Spinner/> :
            <Fragment>
               <h1 className="large text-primary">Developers</h1>
               <p className="lead">
                  <i className="fab fa-connectdevelop"/> Browse and connect with developers
               </p>
               <div className="profiles">
                  {this.renderProfiles()}
               </div>
            </Fragment>
      );
   }
}

Profile.propTypes = {
   profile: PropTypes.object.isRequired,
   getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ( {
   profile: state.profile
} );


export default connect(
   mapStateToProps,
   { getAllProfiles }
)(Profile);
