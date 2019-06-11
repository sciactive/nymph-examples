import { Nymph, Entity } from "nymph-client";

export class Todo extends Entity {
  constructor(id) {
    super(id);
    this.done = false;
  }

  $archive(...args) {
    return this.$serverCall("archive", args);
  }
}

// The name of the server class
Todo.class = "Todo";

Nymph.setEntityClass(Todo.class, Todo);

export default Todo;
