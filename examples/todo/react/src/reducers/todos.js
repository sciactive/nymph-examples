import {Nymph, PubSub} from 'nymph-client';
import Todo from 'Todo';

const todos = (state = {todos: [], archived: false, sort: 'name'}, action) => {
  switch (action.type) {
    case 'UPDATE_TODOS':
      {
        if (action.todos === undefined) {
          return state;
        }
        let todos = state.todos.slice();
        let archived = action.archived;
        PubSub.updateArray(todos, action.todos);
        Nymph.sort(todos, state.sort);
        return {...state, todos, archived};
      }
    case 'SET_SORT':
      {
        let todos = state.todos.slice();
        let sort = action.sort;
        Nymph.sort(todos, action.sort);
        return {...state, todos, sort};
      }
    case 'ADD_TODO':
      {
        let todo = new Todo();
        todo.set('name', action.name);
        todo.save();
        return state;
      }
    case 'TOGGLE_TODO':
      {
        action.todo.set('done', !action.todo.get().done);
        action.todo.save();

        let todos = state.todos.slice();
        todos.splice(action.todo.arraySearch(todos), 1, action.todo);
        return {...state, todos};
      }
    case 'CHANGE_TODO':
      {
        action.todo.set('name', action.name);

        let todos = state.todos.slice();
        todos.splice(action.todo.arraySearch(todos), 1, action.todo);
        return {...state, todos};
      }
    case 'SAVE_TODO':
      {
        action.todo.save();
        return state;
      }
    case 'ARCHIVE_DONE_TODOS':
      {
        for (let i = 0; i < state.todos.length; i++) {
          const todo = state.todos[i];
          if (todo.get().done) {
            todo.archive().then((success) => {
              if (!success) {
                alert("Couldn't save changes to "+todo.get().name);
              }
            }, (errObj) => {
              alert("Error: "+errObj.textStatus+"\nCouldn't archive "+todo.get().name);
            });
          }
        }
        return state;
      }
    case 'DELETE_TODOS':
      {
        Nymph.deleteEntities(state.todos);
        return state;
      }
    default:
      return state;
  }
};

export default todos;
