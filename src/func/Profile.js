import { BaseClass } from "./BaseClass";

class Profile extends BaseClass {
  constructor() {
    super();
  }

  getProfile(authorName) {
    return this.get(`profiles/${authorName}`);
  }

  follow(authorName) {
    return this.post(`profiles/${authorName}/follow`);
  }

  unFollow(authorName) {
    return this.delete(`profiles/${authorName}/follow`);
  }
}

export const profileMethod = new Profile();
