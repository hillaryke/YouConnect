import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

class EditProfile extends Component {

   state = {
      formData: {
         company: '',
         website: '',
         location: '',
         status: '',
         skills: '',
         githubusername: '',
         bio: '',
         instagram: '',
         youtube: '',
         linkedin: '',
         twitter: '',
         facebook: '',
      },
      displaySocialInputs: false,
      fieldsAdded: false
   };

   updateFields = () => {
      const { profile } = this.props.profile;
      this.setState({
         formData: {
            ...this.state.formData,
            company: !profile.company ? '' : profile.company,
            website: !profile.website ? '' : profile.website,
            location: !profile.location ? '' : profile.location,
            status: !profile.status ? '' : profile.status,
            skills: !profile.skills ? '' : profile.skills.join(','),
            githubusername: !profile.githubusername ? '' : profile.githubusername,
            bio: !profile.bio ? '' : profile.bio,
            instagram: !profile.social ? '' : profile.social.instagram,
            youtube: !profile.social ? '' : profile.social.youtube,
            linkedin: !profile.social ? '' : profile.social.linkedin,
            twitter: !profile.social ? '' : profile.social.twitter,
            facebook: !profile.social ? '' : profile.social.facebook,
         }
      });
   };

   componentDidMount() {
      this.props.getCurrentProfile();
      const { loading } = this.props.profile;

      if (!loading) {
         this.updateFields();
         this.setState({ fieldsAdded: true });
      }
   }

   componentDidUpdate() {
      const { loading } = this.props.profile;

      if (!this.state.fieldsAdded && !loading) {
         this.updateFields();
         this.setState({ fieldsAdded: true });
      }
   }

   onInputChange = e => {
      this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
   };

   onFormSubmit = e => {
      e.preventDefault();

      this.props.createProfile(this.state.formData, true);
   };

   render() {
      const { loading } = this.props.profile;

      const {
         company,
         website,
         location,
         status,
         skills,
         githubusername,
         bio,
         instagram,
         youtube,
         linkedin,
         twitter,
         facebook,
      } = this.state.formData;

      return loading ? ( <Spinner/> ) :
         (
            <Fragment>
               <h1 className="large text-primary">
                  Edit Your Profile
               </h1>
               <p className="lead">
                  <i className="fas fa-user"/> Let's get some information to make your
                  profile stand out
               </p>
               <small>* = required field</small>
               <form className="form" onSubmit={e => this.onFormSubmit(e)}>
                  <div className="form-group">
                     <select name="status" value={status} onChange={e => this.onInputChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                     </select>
                     <small className="form-text"
                     >Give us an idea of where you are at in your career</small
                     >
                  </div>
                  <div className="form-group">
                     <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={e => this.onInputChange(e)}
                     />
                     <small className="form-text"
                     >Could be your own company or one you work for</small
                     >
                  </div>
                  <div className="form-group">
                     <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={e => this.onInputChange(e)}
                     />
                     <small className="form-text"
                     >Could be your own or a company website</small
                     >
                  </div>
                  <div className="form-group">
                     <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={e => this.onInputChange(e)}
                     />
                     <small className="form-text"
                     >City & state suggested (eg. Boston, MA)</small
                     >
                  </div>
                  <div className="form-group">
                     <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={skills}
                        onChange={e => this.onInputChange(e)}
                     />
                     <small className="form-text"
                     >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                     >
                  </div>
                  <div className="form-group">
                     <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={e => this.onInputChange(e)}
                     />
                     <small className="form-text"
                     >If you want your latest repos and a Github link, include your
                        username</small
                     >
                  </div>
                  <div className="form-group">
               <textarea
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={bio}
                  onChange={e => this.onInputChange(e)}
               />
                     <small className="form-text">Tell us a little about yourself</small>
                  </div>

                  <div className="my-2">
                     <button
                        onClick={() =>
                           this.setState({ displaySocialInputs: !this.state.displaySocialInputs })
                        }
                        type="button"
                        className="btn btn-light"
                     >
                        Add Social Network Links
                     </button>
                     <span>Optional</span>
                  </div>

                  {this.state.displaySocialInputs &&
                  <Fragment>

                     <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"/>
                        <input
                           type="text"
                           placeholder="Twitter URL"
                           name="twitter"
                           value={twitter}
                           onChange={e => this.onInputChange(e)}
                        />
                     </div>

                     <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"/>
                        <input
                           type="text"
                           placeholder="Facebook URL"
                           name="facebook"
                           value={facebook}
                           onChange={e => this.onInputChange(e)}
                        />
                     </div>

                     <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"/>
                        <input
                           type="text"
                           placeholder="YouTube URL"
                           name="youtube"
                           value={youtube}
                           onChange={e => this.onInputChange(e)}
                        />
                     </div>

                     <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"/>
                        <input
                           type="text"
                           placeholder="Linkedin URL"
                           name="linkedin"
                           value={linkedin}
                           onChange={e => this.onInputChange(e)}
                        />
                     </div>

                     <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"/>
                        <input
                           type="text"
                           placeholder="Instagram URL"
                           name="instagram"
                           value={instagram}
                           onChange={e => this.onInputChange(e)}
                        />
                     </div>
                  </Fragment>
                  }

                  <input type="submit" className="btn btn-primary my-1"/>
                  <Link className="btn btn-light my-1" to="/dashboard">Back to Dashboard</Link>
               </form>
            </Fragment>
         );
   }
}


EditProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ( {
   profile: state.profile
} );

export default connect(
   mapStateToProps,
   { createProfile, getCurrentProfile }
)(EditProfile);
