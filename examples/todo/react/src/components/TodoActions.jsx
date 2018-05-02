import React from 'react';
import PropTypes from 'prop-types';

const TodoActions = ({
  archived,
  todosLength,
  remaining,
  sort,
  onArchiveClick,
  onDeleteClick,
  onToggleArchivedClick,
  onSortClick
}) => {
  return (
    <div>
      <small className="alert alert-info" style={{display: 'block'}}>
        {archived ? (
          <span>{todosLength} archived todos</span>
        ) : (
          <span>
            {todosLength === 0 ? (
              <span>0 todos</span>
            ) : (
              <span>{remaining} of {todosLength} remaining</span>
            )}
          </span>
        )}
        {todosLength > 0 &&
          <span>
            &nbsp;
            [
            {archived ? (
              <a href="javascript:void(0)" onClick={onDeleteClick}>delete</a>
            ) : (
              <a href="javascript:void(0)" onClick={onArchiveClick}>archive done</a>
            )}
            ]
          </span>
        }
        <br />
        <a href="javascript:void(0)" onClick={e => onToggleArchivedClick(!archived)}>show {archived ? 'current' : 'archived'}</a>
      </small>
      {todosLength > 1 &&
        <div style={{textAlign: 'left'}}>
          Sort: <br />
          <label style={{fontWeight: 'normal'}}>
            <input type="radio" checked={sort === 'name'} onChange={e => onSortClick(e.target.value)} name="sort" value="name" /> Alpha</label>
          &nbsp;&nbsp;&nbsp;
          <label style={{fontWeight: 'normal'}}>
            <input type="radio" checked={sort === 'cdate'} onChange={e => onSortClick(e.target.value)} name="sort" value="cdate" /> Created</label>
        </div>
      }
    </div>
  )
};

TodoActions.propTypes = {
  archived: PropTypes.bool.isRequired,
  todosLength: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onToggleArchivedClick: PropTypes.func.isRequired,
  onSortClick: PropTypes.func.isRequired
};

export default TodoActions;
