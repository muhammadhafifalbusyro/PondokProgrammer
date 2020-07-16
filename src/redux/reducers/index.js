import {EMAIL_CHANGE} from '../action/type';
import {combineReducers} from 'redux';

const initialState = {
  email: '',
};

const reducers = (state = {initialState}, action) => {
  switch (action.type) {
    case EMAIL_CHANGE:
      return {...state, email: action.payload};
    default:
      return state;
  }
};

const appState = combineReducers({
  reducers,
});

export default appState;
