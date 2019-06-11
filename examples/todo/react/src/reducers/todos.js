import {Nymph, PubSub} from 'nymph-client';
import Todo from '../../../Todo.src';
import {updateTodo} from '../actions';

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
    case 'UPDATE_TODO':
      {
        if (action.todo === undefined) {
          return state;
        }
        const todo = action.todo;
        const todos = state.todos.slice();
        const i = todo.arraySearch(todos);
        if (i !== false) {
          todos.splice(i, 1, todo);
        }
        return {...state, todos};
      }
    case 'REFRESH_TODOS':
      {
        let todos = state.todos.slice();
        todos.map(todo => todo.$refresh().then(todo => {
          action.asyncDispatch(updateTodo(todo));
        }));
        return state;
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
        todo.name = action.name;
        todo.$save();
        return state;
      }
    case 'TOGGLE_TODO':
      {
        action.todo.done = !action.todo.done;
        action.$patch();

        let todos = state.todos.slice();
        todos.splice(action.todo.$arraySearch(todos), 1, action.todo);
        return {...state, todos};
      }
    case 'CHANGE_TODO':
      {
        action.todo.name = action.name;

        let todos = state.todos.slice();
        todos.splice(action.todo.$arraySearch(todos), 1, action.todo);
        return {...state, todos};
      }
    case 'SAVE_TODO':
      {
        action.$patch();
        return state;
      }
    case 'ARCHIVE_DONE_TODOS':
      {
        for (let i = 0; i < state.todos.length; i++) {
          const todo = state.todos[i];
          if (todo.done) {
            todo.$archive().then(success => {
              if (!success) {
                alert("Couldn't save changes to "+todo.name);
              }
            }, errObj => {
              alert("Error: "+errObj.textStatus+"\nCouldn't archive "+todo.name);
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
