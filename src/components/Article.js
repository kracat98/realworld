import React from "react";

export default function Article(props) {
  const { article, key } = props;

  return (
    <div className="article-preview" key={key}>
      <div className="article-meta">
        <a href="profile.html">
          <img src={article.author.image} alt="" />
        </a>
        <div className="info">
          <a href className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <a href className="preview-link">
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
