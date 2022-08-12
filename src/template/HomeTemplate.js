import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import Header from "../partials/header";
import HeaderLoggedIn from "../partials/headerLoggerIn";
import Home from "../pages/home/home";
import Footer from "../partials/footer";
export default function HomeTemplate(props) {
  const token = localStorage.getItem("token");

  const { Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(propsRoute) => {
        return (
          <Fragment>
            {token ? <HeaderLoggedIn></HeaderLoggedIn> : <Header></Header>}

            <Component {...propsRoute} />

            <Footer />
          </Fragment>
        );
      }}
    ></Route>
  );
}
