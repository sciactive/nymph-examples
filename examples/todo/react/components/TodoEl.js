import React from 'react';
import PropTypes from 'prop-types';

const TodoEl = ({onClick, todo}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: todo.data.done ? 'line-through' : 'none'
    }}
  >
    {todo.data.text}
  </li>
);

TodoEl.propTypes = {
  onClick: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(Todo).isRequired
};

export default TodoEl;
