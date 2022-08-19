import { BaseClass } from "./BaseClass";

class User extends BaseClass {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getUser = () => {
    return this.get("user");
  };

  postUser = (data, login = "") => {
    if (login) {
      return this.post("users/login", data);
    } else {
      return this.post("users", data);
    }
  };
}

export const userMethod = new User();
