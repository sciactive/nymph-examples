import React from 'react';
import PropTypes from 'prop-types';
import TodoEl from './TodoEl';
import Todo from 'Todo';

const TodoList = ({todos, archived, onTodoClick, onTodoChange, onTodoSave}) => (
  <div className="list-group" style={{clear: 'both'}}>
    {!todos.length &&
      <div className="well">You have no todos yet.</div>
    }
    {todos.map(todo => (
      <TodoEl
        key={todo.guid}
        todo={todo}
        archived={archived}
        onClick={() => onTodoClick(todo)}
        onChange={(name) => onTodoChange(todo, name)}
        onSave={(name) => onTodoSave(todo, name)}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.instanceOf(Todo).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onTodoChange: PropTypes.func.isRequired,
  onTodoSave: PropTypes.func.isRequired
};

export default TodoList;
