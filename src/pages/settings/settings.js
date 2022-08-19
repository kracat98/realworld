import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Settings() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios({
        method: "get",
        url: "https://api.realworld.io/api/user",
        headers: { Authorization: `Token ${token}` },
      });
      setUser(res.data.user);
    };
    getUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = event.target;
    const newUserInfo = {
      user: {
        email: userInfo.email.value,
        password: userInfo.password.value,
        username: userInfo.username.value,
        bio: userInfo.bio.value,
        image: userInfo.image.value,
      },
    };
    try {
      const res = await axios({
        method: "put",
        data: newUserInfo,
        url: "https://api.realworld.io/api/user",
        headers: { Authorization: `Token ${token}` },
      });
      localStorage.setItem("token", res.data.user.token);
      localStorage.setItem("userName", res.data.user.username);

      history.push("/");
    } catch (error) {
      alert("Failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    id="image"
                    defaultValue={user.image}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    id="username"
                    defaultValue={user.username}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    id="bio"
                    defaultValue={user.bio}
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    id="email"
                    defaultValue={user.email}
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
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={() => logout()}
              class="btn btn-outline-danger"
              ng-click="$ctrl.logout()"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
