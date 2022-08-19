import React from "react";
import { formatDate } from "../helper/helper";
import { articlesMethod } from "../func/Articles";

export default function Comment({ comment, slug, userName, setComments }) {
  const deleteComment = async () => {
    await articlesMethod.deleteComment(slug, comment.id);
    await articlesMethod
      .getComments(slug)
      .then((res) => setComments(res.data.comments));
  };
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <a href className="comment-author">
          <img src={comment.author.image} className="comment-author-img" />
        </a>
        &nbsp;
        <a href className="comment-author">
          {comment.author.username}
        </a>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
        {comment.author.username === userName ? (
          <span onClick={() => deleteComment()} className="mod-options">
            <i className="ion-trash-a" />
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
