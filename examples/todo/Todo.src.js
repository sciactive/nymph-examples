// This file is a demo class that extends the Entity class.

import Nymph from "Nymph";
import Entity from "NymphEntity";

export default class Todo extends Entity {

  // === Static Properties ===

  static etype = "todo";
  // The name of the server class
  static class = "Todo";

  // === Constructor ===

  constructor(id) {
    super(id);
    this.data.done = false;
  }

  // === Instance Methods ===

  archive() {
    return this.serverCall('archive', arguments);
  }
}

Nymph.setEntityClass("Todo", Todo);
export {Todo};
