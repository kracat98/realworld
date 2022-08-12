import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditArticle(props) {
  const token = localStorage.getItem("token");
  const { slug } = props.match.params;
  const history = useHistory();

  const [tagList, setTagList] = useState([]);
  const [article, setArticle] = useState({});
  console.log(tagList);
  useEffect(() => {
    const getInfo = async () => {
      const articleInfo = await axios({
        method: "get",
        url: `https://api.realworld.io/api/articles/${slug}`,
        headers: { Authorization: `Token ${token}` },
      });
      setArticle(articleInfo.data.article);
      setTagList(articleInfo.data.article.tagList);
    };
    getInfo();
  }, []);

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
    console.log(article);
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
        method: "put",
        data: articleInfo,
        url: `https://api.realworld.io/api/articles/${slug}`,
        headers: { Authorization: `Token ${token}` },
      });
      if (res.status === 200) {
        alert("UPDATE SUCCESS");
        history.push(`/`);
      }
    } catch (error) {
      alert("update that bai");
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={(event) => handleSubmit(event)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    id="title"
                    defaultValue={article.title}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    id="description"
                    defaultValue={article.description}
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
                    defaultValue={article.body}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    onKeyPress={(event) => addTag(event)}
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list">
                    {tagList?.map((t) => {
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
  );
}
