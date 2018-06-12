import {Nymph, PubSub} from 'nymph-client';
import Todo from 'Todo';
import {updateTodos, updateUserCount, updateDisconnected, subscribe, refreshTodos} from '../actions';

let currentDisconnected = false;

const todos = (state = {subscription: null, onPubSubConnect: null, onPubSubDisconnect: null, userCount: null, disconnected: false}, action) => {
  switch (action.type) {
    case 'SUBSCRIBE':
      {
        if (state.subscription) {
          state.subscription.unsubscribe();
        }
        if (state.onPubSubConnect) {
          PubSub.off('connect', state.onPubSubConnect);
        }
        if (state.onPubSubDisconnect) {
          PubSub.off('disconnect', state.onPubSubDisconnect);
        }

        let archived = action.archived;
        let subscription = Nymph.getEntities({'class': Todo.class}, {'type': archived ? '&' : '!&', 'tag': 'archived'}).subscribe((newTodos) => {
          action.asyncDispatch(updateTodos(newTodos, archived));
        }, null, (count) => {
          action.asyncDispatch(updateUserCount(count));
        });
        let onPubSubConnect = () => {
          if (currentDisconnected) {
            action.asyncDispatch(subscribe(archived));
            action.asyncDispatch(refreshTodos());
          }
          action.asyncDispatch(updateDisconnected(false));
        };

        let onPubSubDisconnect = () => {
          action.asyncDispatch(updateDisconnected(true));
        };

        PubSub.on('connect', onPubSubConnect);
        PubSub.on('disconnect', onPubSubDisconnect);

        return {...state, subscription, onPubSubConnect, onPubSubDisconnect};
      }
    case 'UPDATE_USER_COUNT':
      return {...state, userCount: action.userCount};
    case 'UPDATE_DISCONNECTED':
      currentDisconnected = action.disconnected;
      return {...state, disconnected: action.disconnected};
    default:
      return state;
  }
};

export default todos;
