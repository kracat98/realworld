import React, { useEffect, useState } from "react";
import Article from "../../components/Article";
import "./home.css";
import { articlesMethod } from "../../func/Articles";
import { tagsMethod } from "../../func/Tags";

export default function Home() {
  const token = localStorage.getItem("token") || "";
  const [articlesList, setArticlesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getArticles = async () => {
    console.log(token);
    setIsLoading(true);
    const res = await articlesMethod.getArticles();
    setArticlesList(res.data.articles);
    setIsLoading(false);
  };

  const getTags = async () => {
    const res = await tagsMethod.getTags();
    setTags(res.data.tags);
    setIsLoading(false);
  };

  const getFeeds = async () => {
    setIsLoading(true);
    const res = await articlesMethod.getFeed();
    setArticlesList(res.data.articles);
    setIsLoading(false);
  };

  const getArticlesByTag = async (tag) => {
    setIsLoading(true);
    const res = await articlesMethod.getArticlesByTag(tag);
    setArticlesList(res.data.articles);
    setIsLoading(false);
  };

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
    content.style.visibility = "visible";
    content.innerHTML = `#${tagName}`;
    const tab = document.getElementsByClassName("tab");
    for (let i = 0; i < tab.length; i++) {
      tab[i].classList.remove("active");
    }
    content.classList.add("active");
  };

  const hideArticlesWithTag = () => {
    const content = document.getElementById("nav-contact-tab");
    content.style.visibility = "hidden";
  };

  useEffect(() => {
    try {
      getArticles();
      getTags();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <div className="home-page">
      {!token ? (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
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
                      onClick={() => {
                        hideArticlesWithTag();
                        getArticles();
                      }}
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
                    className="tab-pane show active "
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {isLoading ? (
                      <div className="loading">Loading data ...</div>
                    ) : articlesList.length > 0 ? (
                      renderArticles(articlesList)
                    ) : (
                      <div>No articles are here... yet</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {isLoading && <div className="loading">Loading data ...</div>}
              <div className="tag-list">{renderTags(tags)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
