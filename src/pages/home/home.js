import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Article from "../../components/Article";
import "./home.css";

export default function Home() {
  const token = localStorage.getItem("token") || "";

  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [articlesTag, setArticlesTag] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios({
        method: "get",
        url: "https://api.realworld.io/api/articles",
        headers: { Authorization: `Token ${token}` },
      });
      setArticles(res.data.articles);
    };
    try {
      getArticles();
    } catch (error) {
      console.log("error", error);
    }
  }, [token]);

  useEffect(() => {
    const getTags = async () => {
      const res = await axios({
        method: "get",
        url: "https://api.realworld.io/api/tags",
        headers: { Authorization: `Token ${token}` },
      });
      setTags(res.data.tags);
    };
    try {
      getTags();
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const getFeeds = async () => {
    const res = await axios({
      method: "get",
      url: "https://api.realworld.io/api/articles/feed",
      headers: { Authorization: `Token ${token}` },
    });
    setFeeds(res.data.articles);
  };
  const getArticlesByTag = async (tag) => {
    const res = await axios({
      method: "get",
      url: `https://api.realworld.io/api/articles?tag=${tag}`,
      headers: { Authorization: `Token ${token}` },
    });
    setArticlesTag(res.data.articles);
  };
  //   useEffect(() => {
  //     try {
  //       getFeeds();
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }, []);

  // useEffect(() => {
  //   const tagsList = document.querySelectorAll('.tag-pill')
  //   console.log(tagsList)
  // })

  const renderArticles = (data) => {
    return data?.map((article, index) => {
      return <Article article={article} key={index}></Article>;
    });
  };

  const renderTags = (data) => {
    return data.map((tag, index) => {
      return (
        <p
          onClick={() => {
            showArticlesWithTag(tag);
            getArticlesByTag(tag);
          }}
          key={index}
          className="tag-pill tag-default"
        >
          {tag}
        </p>
      );
    });
  };

  const showArticlesWithTag = (tagName) => {
    const content = document.getElementById("nav-contact-tab");
    const contentArticals = document.getElementById("nav-contact");
    content.style.visibility = "visible";
    content.innerHTML = `#${tagName}`;
    const tab = document.getElementsByClassName("tab");
    for (let i = 0; i < tab.length; i++) {
      tab[i].classList.remove("active");
    }
    content.classList.add("active");
    const tabPane = document.getElementsByClassName("tab-pane");
    for (let i = 0; i < tabPane.length; i++) {
      tabPane[i].classList.remove("show");
      tabPane[i].classList.remove("active");
    }
    contentArticals.classList.add("show", "active");
  };

  const hideArticlesWithTag = () => {
    const content = document.getElementById("nav-contact-tab");
    content.style.visibility = "hidden";
  };

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              {/* <ul className="nav nav-pills outline-active">
                        <li className="nav-item">
                        <a className="nav-link " href>Your Feed</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href>Global Feed</a>
                        </li>
                    </ul> */}

              <div>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      onClick={() => {
                        getFeeds();
                        hideArticlesWithTag();
                      }}
                      className="nav-item nav-link tab"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Your Feed
                    </a>
                    <a
                      onClick={() => hideArticlesWithTag()}
                      className="nav-item nav-link tab active"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Global Feed
                    </a>
                    <a
                      style={{ visibility: "hidden" }}
                      className="nav-item nav-link d-hidden"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      Contact
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane "
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    {renderArticles(feeds)}
                  </div>
                  <div
                    className="tab-pane show active "
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {renderArticles(articles)}
                  </div>
                  <div
                    className="tab-pane "
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    {renderArticles(articlesTag)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">{renderTags(tags)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
