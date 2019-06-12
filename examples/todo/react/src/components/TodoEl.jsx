import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../../../Todo.src';

const TodoEl = ({ todo, archived, onClick, onChange, onSave }) => {
  const todoStyle = {
    display: 'inline',
    backgroundColor: 'transparent',
    border: 0,
    flexGrow: 1,
  };

  const todoStyleDone = Object.assign({}, todoStyle, {
    textDecoration: 'line-through',
    color: 'grey',
  });

  return (
    <label
      className={
        'list-group-item list-group-item-' + (todo.done ? 'success' : 'warning')
      }
      style={{ fontWeight: 'normal', cursor: 'pointer' }}
    >
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', flexGrow: 1 }}>
          {!archived && (
            <input
              type="checkbox"
              checked={todo.done}
              onChange={onClick}
              style={{ marginRight: '5px' }}
            />
          )}
          <input
            type="text"
            style={todo.done ? todoStyleDone : todoStyle}
            value={todo.name}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.keyCode === 13 && onSave()}
            onBlur={e => onSave()}
          />
        </span>
        <span style={{ display: 'flex', marginLeft: '5px', flexShrink: 1 }}>
          {(() => {
            const date = new Date(todo.cdate * 1000);
            return `${date.getFullYear()}-${
              date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1
            }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${
              date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            }:${
              date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes()
            }`;
          })()}
        </span>
      </span>
    </label>
  );
};

TodoEl.propTypes = {
  todo: PropTypes.instanceOf(Todo).isRequired,
  archived: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TodoEl;
