import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul
          className="nav navbar-nav pull-xs-right"
        >
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav-link">
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
