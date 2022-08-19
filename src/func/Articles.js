import { BaseClass } from "./BaseClass";

class Articles extends BaseClass {
  constructor() {
    super();
  }

  getArticles() {
    return this.get("articles");
  }

  getFeed() {
    return this.get("articles/feed");
  }

  getArticlesByTag(tag) {
    return this.get(`articles?tag=${tag}`);
  }

  getArticlesByAuthor(author) {
    return this.get(`articles?author=${author}`);
  }

  getArticlesByFavorited(username) {
    return this.get(`articles?favorited=${username}`);
  }

  getArticlesBySlug(slug) {
    return this.get(`articles/${slug}`);
  }

  deleteArticleBySlug(slug) {
    return this.delete(`articles/${slug}`);
  }

  favoriteArticle(slug) {
    return this.post(`articles/${slug}/favorite`);
  }

  unFavoriteArticle(slug) {
    return this.delete(`articles/${slug}/favorite`);
  }

  getComments(slug) {
    return this.get(`articles/${slug}/comments`);
  }

  postComment(slug, comment) {
    return this.post(`articles/${slug}/comments`, comment);
  }

  deleteComment(slug, id) {
    return this.delete(`articles/${slug}/comments/${id}`);
  }
}

export const articlesMethod = new Articles();
