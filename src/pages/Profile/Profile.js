import React, { useState } from "react";
import { useEffect } from "react";
import { articlesMethod } from "../../func/Articles";
import { profileMethod } from "../../func/Profile";
import Article from "../../components/Article";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Profile(props) {
  const history = useHistory();
  const userName = localStorage.getItem("userName");
  const [articles, setArticles] = useState([]);
  const [authorInfo, setAuthorInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authorName = props.match.params.username;

  const getProfile = async (authorName) => {
    const res = await profileMethod.getProfile(authorName);
    setAuthorInfo(res.data.profile);
  };

  const getArticlesByAuthor = async (authorName) => {
    setIsLoading(true);
    const res = await articlesMethod.getArticlesByAuthor(authorName);
    setArticles(res.data.articles);
    setIsLoading(false);
  };

  const getArticlesByFavorited = async (username) => {
    setIsLoading(true);
    const res = await articlesMethod.getArticlesByFavorited(username);
    setArticles(res.data.articles);
    setIsLoading(false);
  };

  const renderArticles = (data) => {
    if (data.length > 0) {
      return data.map((article, index) => {
        return <Article article={article} key={index}></Article>;
      });
    }
  };

  const follow = async () => {
    const followBtn = document.getElementById("follow-btn");
    followBtn.classList.add("no-drop");
    await profileMethod.follow(authorName).then((res) => {
      setAuthorInfo(res.data.profile);
      followBtn.classList.remove("no-drop");
    });
  };

  const unFollow = async () => {
    const unfollowBtn = document.getElementById("unfollow-btn");
    unfollowBtn.classList.add("no-drop");
    await profileMethod
      .unFollow(authorName)
      .then((res) => {
        setAuthorInfo(res.data.profile);
        unfollowBtn.classList.remove("no-drop");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.getElementById("nav-profile-tab").classList.remove("active");
    document.getElementById("nav-home-tab").classList.add("active");
    getProfile(authorName);
    getArticlesByAuthor(authorName);
  }, [authorName]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                style={{ width: "10%", borderRadius: "500px" }}
                src={authorInfo.image}
              />
              <h4>{authorInfo.username}</h4>
              <p>{authorInfo.bio}</p>
              {userName === authorInfo.username ? (
                <button
                  onClick={() => history.push("settings")}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-plus-round" />
                  &nbsp; Edit Profile Setting
                </button>
              ) : authorInfo.following ? (
                <button
                  id="unfollow-btn"
                  onClick={() => unFollow()}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-plus-round" />
                  &nbsp; Unfollow {authorInfo.username} {}
                </button>
              ) : (
                <button
                  id="follow-btn"
                  onClick={() => follow()}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-plus-round" />
                  &nbsp; Follow {authorInfo.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <div>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      onClick={() => {
                        getArticlesByAuthor(authorName);
                      }}
                      className="nav-item nav-link tab active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      My Articles
                    </a>
                    <a
                      onClick={() => getArticlesByFavorited(authorName)}
                      className="nav-item nav-link tab"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Favorited Articles
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    {isLoading ? (
                      <div className="loading">Loading data ...</div>
                    ) : articles.length > 0 ? (
                      renderArticles(articles)
                    ) : (
                      <div>No articles are here... yet</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
