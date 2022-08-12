import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { user } from "../../func/User";
export default function SignIn() {
  let history = useHistory();
  const handleSignIn = async (event) => {
    event.preventDefault();
    const userForm = event.target;
    const userInfor = {
      user: {
        email: userForm.email.value,
        password: userForm.password.value,
      },
    };
    try {
      const res = await user.postUser(userInfor, true);
      const result = res.data.user;
      if (res.status === 200) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userName", result.username);
        localStorage.setItem("avatar", result.image);
        history.push("/");
      } else {
        alert("DN that bai");
      }
    } catch (error) {
      alert("DN that bai");
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href>Have an account?</a>
            </p>
            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>
            <form
              onSubmit={(event) => {
                handleSignIn(event);
              }}
            >
              <fieldset className="form-group">
                <input
                  id="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  id="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
