import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import DeleteAccount from "./DeleteData";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { logout } from "../../actions/auth";

class Dashboard extends Component {

   componentDidMount() {
      this.props.getCurrentProfile();
   }

   renderDeleteAccount = () => {
      const onClickDelete = ( { history } ) => {
         this.props.deleteAccount(history);
      };

      return ( this.props.match.path === '/dashboard/remove' && (
         <DeleteAccount
            onClickDelete={onClickDelete}
            itemTitle="Account"
         />
      ) );
   };

   render() {
      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;
      const matched_id = this.props.match.params.id;

      return loading ? ( <Spinner/> ) :
         (
            <Fragment>
               <h1 className="large text-primary">Dashboard</h1>
               <p className="lead">
                  <i className="fas fa-user"/> Welcome {user && user.name}
               </p>
               {profile !== null ?
                  <Fragment>
                     <DashboardActions/>
                     <Experience
                        experience={profile.experience}
                        path={this.props.match.path}
                        matched_id={matched_id}
                     />

                     <Education
                        education={profile.education}
                        path={this.props.match.path}
                        matched_id={matched_id}
                     />
                  </Fragment> :
                  <Fragment>
                     <p>You have not yet setup a profile, please add some info</p>
                     <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                     </Link>
                  </Fragment>
               }
               <div className="my-2">
                  <Link to="/dashboard/remove" className="btn btn-danger">
                     <i className="fas fa-user-minus"/>
                     Delete My Account
                  </Link>
               </div>
               {this.renderDeleteAccount()}
            </Fragment>
         );
   }
}

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   deleteAccount: PropTypes.func.isRequired,
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ( {
   auth: state.auth,
   profile: state.profile
} );

export default connect(
   mapStateToProps,
   { getCurrentProfile, deleteAccount, logout }
)(Dashboard);
