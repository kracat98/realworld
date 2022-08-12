import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./createNewArticle.css";

export default function CreateNewArticle() {
  const [tagList, setTagList] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");

  const addTag = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTagList([...tagList, event.target.value]);
      event.target.value = "";
    }
  };

  const deleteTag = (event) => {
    const tagValue = event.target.parentElement.innerText;
    setTagList((prev) => prev.filter((t) => t !== tagValue));
    console.log(tagValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const article = event.target;

    const articleInfo = {
      article: {
        title: article.title.value,
        description: article.description.value,
        body: article.body.value,
        tagList: tagList,
      },
    };
    console.log(articleInfo);
    try {
      const res = await axios({
        method: "post",
        data: articleInfo,
        url: "https://api.realworld.io/api/articles",
        headers: { Authorization: `Token ${token}` },
      });
      if (res.status === 200) {
        alert("ADD SUCCESS")
        history.push(`/article/${res.data.article.slug}`);
      }
    } catch (error) {
      alert("tao that bai");
    }
  };

  return (
    <div>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={(event) => handleSubmit(event)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      id="title"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      id="description"
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      id="body"
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      defaultValue={""}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      onKeyPress={(event) => addTag(event)}
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                    />
                    <div className="tag-list tag-list2">
                      {tagList.map((t) => {
                        return (
                          <div
                            style={{ cursor: "auto" }}
                            className="tag-default tag-pill ng-binding ng-scope"
                          >
                            <i
                              className="ion-close-round"
                              onClick={(event) => deleteTag(event)}
                            ></i>
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
