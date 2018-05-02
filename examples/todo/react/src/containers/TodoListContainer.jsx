import {connect} from 'react-redux';
import {toggleTodo, changeTodo} from '../actions';
import TodoList from '../components/TodoList';

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    archived: state.todos.archived
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: todo => {
      dispatch(toggleTodo(todo));
    },
    onTodoChange: (todo, name) => {
      dispatch(changeTodo(todo, name));
    }
  };
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
