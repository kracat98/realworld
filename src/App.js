import React, { Fragment } from "react";
import Home from "./pages/home/home";
import SignUp from "./pages/signup/signup";
import SignIn from "./pages/signin/signin";
import Footer from "./partials/footer";
import HomeTemplate from "./template/HomeTemplate";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import CreateNewArticle from "./pages/articles/createNewArticle";
import Settings from "./pages/settings/settings";
import EditArticle from "./pages/articles/EditArticle";
import Profile from "./pages/Profile/Profile";

export default function App() {
  return (
    <Router>
      <Switch>
        <HomeTemplate exact path="/signin" Component={SignIn} />
        <HomeTemplate exact path="/signup" Component={SignUp} />
        <HomeTemplate exact path="/editor" Component={CreateNewArticle} />
        <HomeTemplate exact path="/settings" Component={Settings} />
        <HomeTemplate exact path="/editor/:slug" Component={EditArticle} />
        <HomeTemplate exact path="/:username" Component={Profile} />
        <HomeTemplate exact path="/" Component={Home} />
      </Switch>
    </Router>
  );
}
