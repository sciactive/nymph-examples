import {connect} from 'react-redux';
import {archiveDoneTodos, deleteTodos, subscribe, setSort} from '../actions';
import TodoActions from '../components/TodoActions';

const getRemainingTodos = (todos) => {
  return todos.filter(todo => !todo.done);
};

const mapStateToProps = state => {
  return {
    archived: state.todos.archived,
    todosLength: state.todos.todos.length,
    remaining: getRemainingTodos(state.todos.todos).length,
    sort: state.todos.sort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArchiveClick: () => {
      dispatch(archiveDoneTodos());
    },
    onDeleteClick: () => {
      dispatch(deleteTodos());
    },
    onToggleArchivedClick: archived => {
      dispatch(subscribe(archived));
    },
    onSortClick: sort => {
      dispatch(setSort(sort));
    }
  };
};

const TodoActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoActions);

export default TodoActionsContainer;
