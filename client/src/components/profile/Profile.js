import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfileById } from "../../actions/profile";
import { getUserRepos } from "../../actions/profile";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../layout/Spinner";

class Profile extends Component {
   componentDidMount() {
      this.props.getProfileById(this.props.match.params.id);
   }

   render() {
      const { profile, loading: profileLoading } = this.props.profile;
      const { isAuthenticated, loading: authLoading, user } = this.props.auth;
      const { id: currUserId } = this.props.match.params;

      return ( this.props.profile.profile ?
            <Fragment>
               <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
               {isAuthenticated && !authLoading && user._id === currUserId &&
               <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
               }

               <div className="profile-grid my-1">
                  <ProfileTop profile={profile}/>

                  <ProfileAbout profile={profile}/>

                  <ProfileExperience experiences={profile.experience}/>

                  <ProfileEducation education={profile.education}/>

                  <ProfileGithub githubusername={profile.githubusername}/>

               </div>
            </Fragment> : profileLoading ?
               <Spinner/> : <h3>There is no Profile for this User</h3>
      );
   }
}

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   getUserRepos: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ( {
   profile: state.profile,
   auth: state.auth
} );

export default connect(
   mapStateToProps,
   { getProfileById, getUserRepos }
)(Profile);
