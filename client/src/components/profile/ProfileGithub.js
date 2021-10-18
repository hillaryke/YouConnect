import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem";
import { getUserRepos } from "../../actions/profile";

class Github extends Component {
   componentDidMount() {
      if (this.props.githubusername) {
         this.props.getUserRepos(this.props.githubusername);
      }
   }

   render() {
      return (
         <div className="profile-github">
            <h2 className="text-primary my-1">
               <i className="fab fa-github"/> Github Repos
            </h2>

            {this.props.repos.length > 0 ?
               this.props.repos.map(repo => (
                  <RepoItem key={repo.id} repo={repo}/>
               )) : (
                  <div className="repo bg-white p-1 my-1">
                     <h3>No Github repos found for this user</h3>
                  </div>
               )
            }
         </div>

      );
   }
}

Github.propTypes = {
   githubusername: PropTypes.string,
   getUserRepos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ( {
   repos: state.profile.repos
} );

export default connect(
   mapStateToProps,
   { getUserRepos }
)(Github);
