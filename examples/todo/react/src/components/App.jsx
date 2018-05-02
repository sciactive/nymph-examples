import React from 'react';
import AddTodoContainer from '../containers/AddTodoContainer';
import TodoListContainer from '../containers/TodoListContainer';
import TodoActionsContainer from '../containers/TodoActionsContainer';
import FooterContainer from '../containers/FooterContainer';

const App = () => (
  <div>
    <div className="row">
      <div className="col-sm-8">
        <TodoListContainer />
      </div>
      <div className="col-sm-4" style={{textAlign: 'center', marginBottom: '1em'}}>
        <TodoActionsContainer />
      </div>
    </div>
    <AddTodoContainer />
    <FooterContainer />
  </div>
);

export default App;
