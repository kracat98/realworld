import React from "react";
import { user } from "../../func/User";
import { useHistory } from "react-router-dom";
export default function SignUp() {
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formInput = event.target;
    const userInfor = {
      user: {
        username: formInput.username.value,
        email: formInput.email.value,
        password: formInput.password.value,
      },
    };
    try {
      const res = await user.postUser(userInfor);
      if (res.status === 200) {
        history.push("/signin");
        alert("Dk thanh cong");
      } else {
        alert("Dk that bai");
      }
    } catch (error) {
      alert("Dk that bai");
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href>Have an account?</a>
            </p>
            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>
            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <fieldset className="form-group">
                <input
                  id="username"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
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
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
