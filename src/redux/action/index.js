import {EMAIL_CHANGE, AUTHENTICATION_CHANGE} from './type';

const emailChange = text => {
  return {
    type: EMAIL_CHANGE,
    payload: text,
  };
};

const authenticationChange = text => {
  return {
    type: AUTHENTICATION_CHANGE,
    payload: text,
  };
};

export {emailChange, authenticationChange};
