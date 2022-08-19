import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { articlesMethod } from "../../func/Articles";
import { profileMethod } from "../../func/Profile";
import { userMethod } from "../../func/User";
import { formatDate } from "../../helper/helper";
import Comment from "../../components/Comment";

let userName, userImage;

export default function ArticleInfo(props) {
  const history = useHistory();
  const slug = props.match.params.slug;
  const [articlesInfo, setArticlesInfo] = useState({});
  const [authorInfo, setAuthorInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const following = authorInfo.following;
  const favorited = articlesInfo.favorited;
  // console.log(comments);
  const getUserProfile = async () => {
    const res = await userMethod.getUser();
    userName = res.data.user.username;
    userImage = res.data.user.image;
  };

  const getArticleInfo = async (slug) => {
    const res = await articlesMethod.getArticlesBySlug(slug);
    setArticlesInfo(res.data.article);
    setAuthorInfo(res.data.article.author);
    setIsLoading(false);
  };

  const getComments = async (slug) => {
    const res = await articlesMethod.getComments(slug);
    setComments(res.data.comments);
  };

  const editArticle = () => {
    history.push(`../editor/${articlesInfo.slug}`);
  };

  const deleteArticle = async () => {
    await articlesMethod.deleteArticleBySlug(articlesInfo.slug);
    history.push("");
  };
  const follow = async () => {
    const followBtn = document.getElementById("follow-btn");
    followBtn.classList.add("no-drop");
    await profileMethod.follow(articlesInfo.author.username).then((res) => {
      setAuthorInfo(res.data.profile);
      followBtn.classList.remove("no-drop");
    });
  };

  const unFollow = async () => {
    const unfollowBtn = document.getElementById("unfollow-btn");
    unfollowBtn.classList.add("no-drop");
    await profileMethod
      .unFollow(articlesInfo.author.username)
      .then((res) => {
        setAuthorInfo(res.data.profile);
        unfollowBtn.classList.remove("no-drop");
      })
      .catch((err) => console.log(err));
  };

  const favorite = async () => {
    const favoriteBtn = document.getElementById("favorite-btn");
    favoriteBtn.classList.add("no-drop");
    await articlesMethod
      .favoriteArticle(articlesInfo.slug)
      .then((res) => {
        console.log(res);
        setArticlesInfo(res.data.article);
        favoriteBtn.classList.remove("no-drop");
      })
      .catch((err) => console.log(err));
  };

  const unFavorite = async () => {
    const unFavoriteBtn = document.getElementById("unFavorite-btn");
    unFavoriteBtn.classList.add("no-drop");
    await articlesMethod
      .unFavoriteArticle(articlesInfo.slug)
      .then((res) => {
        setArticlesInfo(res.data.article);
        unFavoriteBtn.classList.remove("no-drop");
      })
      .catch((err) => console.log(err));
  };

  const postComment = async (event) => {
    event.preventDefault();
    const comment = {
      comment: {
        body: event.target.comment.value,
      },
    };
    await articlesMethod
      .postComment(slug, comment)
      .then((res) => {
        setComments((prev) => [...prev, res.data.comment]);
        event.target.comment.value = "";
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserProfile();
    getArticleInfo(slug);
    getComments(slug);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{articlesInfo.title}</h1>
              <div className="article-meta">
                <a href>
                  <img src={articlesInfo.author?.image} />
                </a>
                <div className="info">
                  <Link
                    to={`../${articlesInfo.author?.username}`}
                    className="author"
                  >
                    {articlesInfo.author?.username}
                  </Link>
                  <span className="date">
                    {formatDate(articlesInfo.createdAt)}
                  </span>
                </div>
                {userName === articlesInfo.author?.username ? (
                  <Fragment>
                    <button
                      onClick={() => editArticle()}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <i className="ion-edit" />
                      &nbsp; Edit Article
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => deleteArticle()}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="ion-trash-a" />
                      &nbsp; Delete Article
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {following ? (
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
                    &nbsp;&nbsp;
                    {favorited ? (
                      <button
                        onClick={() => unFavorite()}
                        id="unFavorite-btn"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="ion-heart" />
                        &nbsp; Unfavorite Article
                        <span className="counter">
                          {`(${articlesInfo.favoritesCount})`}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => favorite()}
                        id="favorite-btn"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="ion-heart" />
                        &nbsp; Favorite Article
                        <span className="counter">{`(${articlesInfo.favoritesCount})`}</span>
                      </button>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="container page">
            {/* Detail of an article */}
            <div className="row article-content">
              <div className="col-md-12">
                <p>{articlesInfo.body}</p>
                <ul>
                  {articlesInfo.tagList?.map((tag, index) => {
                    return (
                      <li
                        key={index}
                        className="tag-default tag-pill tag-outline ng-binding ng-scope"
                        style={{ cursor: "auto" }}
                      >
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <hr />
            <div className="article-actions">
              <div className="article-meta">
                <a href>
                  <img src={articlesInfo.author?.image} />
                </a>
                <div className="info">
                  <div className="info">
                    <Link
                      to={`../${articlesInfo.author?.username}`}
                      className="author"
                    >
                      {articlesInfo.author?.username}
                    </Link>
                    <span className="date">
                      {formatDate(articlesInfo.createdAt)}
                    </span>
                  </div>
                </div>
                {userName === articlesInfo.author?.username ? (
                  <Fragment>
                    <button
                      onClick={() => editArticle()}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <i className="ion-edit" />
                      &nbsp; Edit Article
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => deleteArticle()}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="ion-trash-a" />
                      &nbsp; Delete Article
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {following ? (
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
                    &nbsp;
                    {favorited ? (
                      <button
                        onClick={() => unFavorite()}
                        id="unFavorite-btn"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="ion-heart" />
                        &nbsp;Unfavorite Article
                        <span className="counter">
                          {`(${articlesInfo.favoritesCount})`}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => favorite()}
                        id="favorite-btn"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="ion-heart" />
                        &nbsp;Favorite Article
                        <span className="counter">{`(${articlesInfo.favoritesCount})`}</span>
                      </button>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form
                  className="card comment-form"
                  onSubmit={(event) => postComment(event)}
                >
                  <div className="card-block">
                    <textarea
                      id="comment"
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={3}
                      defaultValue={""}
                    />
                  </div>
                  <div className="card-footer">
                    <img src={userImage} className="comment-author-img" />
                    <button className="btn btn-sm btn-primary" type="submit">
                      Post Comment
                    </button>
                  </div>
                </form>
                {comments.map((c) => {
                  return (
                    <Comment
                      comment={c}
                      slug={slug}
                      userName={userName}
                      setComments={setComments}
                    ></Comment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
