import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../actions';

const mapStateToProps = state => {
  return {
    archived: state.todos.archived,
    nextNumber: state.todos.todos.length + 1,
  };
};

const AddTodo = ({ archived, nextNumber, dispatch }) => {
  if (archived) {
    return null;
  }

  let input;

  return (
    <div>
      <form
        style={{ display: 'flex', marginBottom: '20px' }}
        onSubmit={e => {
          e.preventDefault();
          const trimmedInput = input.value.trim();
          if (!trimmedInput) {
            return;
          }
          dispatch(addTodo(trimmedInput));
          input.value = '';
        }}
      >
        <input
          className="form-control"
          style={{ flexGrow: 1, marginRight: '5px' }}
          type="text"
          placeholder="add new todo here"
          ref={node => {
            input = node;
          }}
        />
        <button className="btn btn-default" type="submit">
          add #{nextNumber}
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  archived: PropTypes.bool.isRequired,
  nextNumber: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const AddTodoContainer = connect(mapStateToProps)(AddTodo);

export default AddTodoContainer;
