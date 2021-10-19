import React from 'react';
import { Route, Switch } from "react-router-dom";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-form/CreateProfile";
import EditProfile from "../profile-form/EditProfile";
import AddExperience from "../profile-form/AddExperience";
import AddEducation from "../profile-form/AddEducation";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import DeletePage from "../delete/DeletePage";
import NotFound from "../layout/NotFound";

const Routes = () => {
   return (
      <section className="container">
         <Alert/>
         <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profiles" component={Profiles}/>
            <Route exact path="/profiles/:id" component={Profile}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/dashboard/remove" component={Dashboard}/>
            <PrivateRoute exact path="/dashboard/education/:id" component={Dashboard}/>
            <PrivateRoute exact path="/dashboard/experience/:id" component={Dashboard}/>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
            <PrivateRoute exact path="/add-education" component={AddEducation}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
            <PrivateRoute exact path="/posts/:id" component={Post}/>
            <PrivateRoute exact path="/delete/post/:id" component={DeletePage}/>
            <PrivateRoute exact path="/delete/comment/:postId/:commentId" component={DeletePage}/>
            <PrivateRoute exact path="/delete/comment/:id" component={DeletePage}/>
            <Route component={NotFound}/>
         </Switch>
      </section>
   );
};

export default Routes;
