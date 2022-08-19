import { BaseClass } from "./BaseClass";

class Tags extends BaseClass {
  constructor() {
    super();
  }

  getTags() {
    return this.get("tags");
  }
}

export const tagsMethod = new Tags();
