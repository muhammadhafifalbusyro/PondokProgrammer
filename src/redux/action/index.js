import {AUTHENTICATION_CHANGE} from './type';

const authenticationChange = text => {
  return {
    type: AUTHENTICATION_CHANGE,
    payload: text,
  };
};

export {authenticationChange};
