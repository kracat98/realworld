import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { baseClass } from "../func/BaseClass";
import { user } from "../func/User";

export default function HeaderLoggedIn() {
  const userName = localStorage.getItem("userName");
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const a = await user.getUser();
  //     console.log("object", a);
  //   };
  // }, []);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/editor" className="nav-link">
              <i className="ion-compose" />
              &nbsp;New Article
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <i className="ion-gear-a" />
              &nbsp;Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/${userName}`} className="nav-link">
              <image />
              {userName}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
