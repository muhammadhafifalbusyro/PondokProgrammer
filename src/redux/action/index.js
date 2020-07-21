import {EMAIL_CHANGE, AUTHENTICATION_CHANGE,JURUSAN_ID} from './type';

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

const jurusanID = text => {
  return {
    type: JURUSAN_ID,
    payload: text,
  };
};

export {emailChange, authenticationChange,jurusanID};
