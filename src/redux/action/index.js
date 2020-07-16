import {EMAIL_CHANGE} from './type';

const emailChange = (text) => {
  return {
    type: EMAIL_CHANGE,
    payload: text,
  };
};

export {emailChange};
