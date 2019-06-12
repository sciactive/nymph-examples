import { combineReducers } from 'redux';
import todos from './todos';
import subscription from './subscription';

const todoApp = combineReducers({
  todos,
  subscription,
});

export default todoApp;
