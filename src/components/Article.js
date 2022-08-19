import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { articlesMethod } from "../func/Articles";

export default function Article(props) {
  const history = useHistory();
  const { article, key } = props;
  const [articleInfo, setArticleInfo] = useState(article);
  const showArticle = () => {
    history.push(`article/${article.slug}`);
  };
  const handleFavorite = async () => {
    if (articleInfo.favorited) {
      const res = await articlesMethod.unFavoriteArticle(article.slug);
      setArticleInfo(res.data.article);
    } else {
      const res = await articlesMethod.favoriteArticle(article.slug);
      setArticleInfo(res.data.article);
    }
  };
  return (
    <div className="article-preview" key={key}>
      <div className="article-meta">
        <a href="profile.html">
          <img src={article.author.image} alt="" />
        </a>
        <div className="info">
          <Link to={article.author.username} className="author">
            {article.author.username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          onClick={() => handleFavorite()}
          className="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i className="ion-heart" /> {articleInfo.favoritesCount}
        </button>
      </div>
      <a onClick={() => showArticle()} href className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul>
          {article.tagList.map((tag, index) => {
            return (
              <li
                key={index}
                className="tag-default tag-pill tag-outline ng-binding ng-scope"
              >
                {tag}
              </li>
            );
          })}
        </ul>
      </a>
    </div>
  );
}
