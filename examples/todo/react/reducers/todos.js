const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          guid: Math.random
          data
        }
      ];
  }
};
