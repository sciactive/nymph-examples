import React from 'react';
import { connect } from 'react-redux';
import AddTodoContainer from '../containers/AddTodoContainer';
import TodoListContainer from '../containers/TodoListContainer';
import TodoActionsContainer from '../containers/TodoActionsContainer';
import FooterContainer from '../containers/FooterContainer';

const mapStateToProps = state => {
  return {
    disconnected: state.subscription.disconnected,
  };
};

const App = ({ disconnected }) => (
  <div>
    {disconnected && (
      <div className="alert alert-danger">
        You are disconnected. Check to make sure you're online.
      </div>
    )}
    <div className="row">
      <div className="col-sm-8">
        <TodoListContainer />
      </div>
      <div
        className="col-sm-4"
        style={{ textAlign: 'center', marginBottom: '1em' }}
      >
        <TodoActionsContainer />
      </div>
    </div>
    <AddTodoContainer />
    <FooterContainer />
  </div>
);

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
