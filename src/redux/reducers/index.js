import {EMAIL_CHANGE, AUTHENTICATION_CHANGE} from '../action/type';
import {combineReducers} from 'redux';

const initialState = {
  authentication: '',
};

const reducers = (state = {initialState}, action) => {
  switch (action.type) {
    case AUTHENTICATION_CHANGE:
      return {...state, authentication: action.payload};
    default:
      return state;
  }
};

const appState = combineReducers({
  reducers,
});

export default appState;
