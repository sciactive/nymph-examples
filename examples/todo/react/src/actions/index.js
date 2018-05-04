export const addTodo = name => {
  return {
    type: 'ADD_TODO',
    name
  };
};

export const setSort = sort => {
  return {
    type: 'SET_SORT',
    sort
  };
};

export const toggleTodo = todo => {
  return {
    type: 'TOGGLE_TODO',
    todo
  };
};

export const changeTodo = (todo, name) => {
  return {
    type: 'CHANGE_TODO',
    todo,
    name
  };
};

export const saveTodo = (todo) => {
  return {
    type: 'SAVE_TODO',
    todo
  };
};

export const archiveDoneTodos = () => {
  return {
    type: 'ARCHIVE_DONE_TODOS'
  }
};

export const deleteTodos = () => {
  return {
    type: 'DELETE_TODOS'
  }
};

export const subscribe = archived => {
  return {
    type: 'SUBSCRIBE',
    archived
  };
};

export const updateUserCount = userCount => {
  return {
    type: 'UPDATE_USER_COUNT',
    userCount
  };
};

export const updateTodos = (todos, archived) => {
  return {
    type: 'UPDATE_TODOS',
    todos,
    archived
  };
};
