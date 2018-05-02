import React from 'react';
import PropTypes from 'prop-types';
import Todo from 'Todo';

const TodoEl = ({onClick, onChange, todo, archived}) => {

  const todoStyle = {
    display: 'inline',
    backgroundColor: 'transparent',
    border: 0,
    flexGrow: 1
  };

  const todoStyleDone = Object.assign({}, todoStyle, {
    textDecoration: 'line-through',
    color: 'grey'
  });

  return (
    <label className={'list-group-item list-group-item-'+(todo.data.done ? 'success' : 'warning')} style={{fontWeight: 'normal', cursor: 'pointer'}}>
      <span style={{display: 'flex', justifyContent: 'space-between'}}>
        <span style={{display: 'flex', flexGrow: 1}}>
          {!archived &&
            <input type="checkbox" checked={todo.data.done} onChange={onClick} style={{marginRight: '5px'}} />
          }
          <input type="text" style={todo.data.done ? todoStyleDone : todoStyle} defaultValue={todo.data.name} onKeyDown={e => e.keyCode === 13 && onChange(e.target.value)} onBlur={e => onChange(e.target.value)} />
        </span>
        <span style={{display: 'flex', marginLeft: '5px', flexShrink: 1}}>
          {(() => {
            const date = new Date(todo.cdate * 1000);
            return `${date.getFullYear()}-${date.getMonth+1 < 10 ? '0'+date.getMonth()+1 : date.getMonth()+1}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()} ${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}`;
          })()}
        </span>
      </span>
    </label>
  );
};

TodoEl.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(Todo).isRequired,
  archived: PropTypes.bool.isRequired
};

export default TodoEl;
