import {Nymph, Entity} from 'nymph-client';

export class Todo extends Entity {
  // === Constructor ===

  constructor(id) {
    super(id);
    this.data.done = false;
  }

  // === Instance Methods ===

  archive(...args) {
    return this.serverCall('archive', args);
  }
}

// === Static Properties ===

Todo.etype = 'todo';
// The name of the server class
Todo.class = 'Todo';

Nymph.setEntityClass(Todo.class, Todo);

export default Todo;
