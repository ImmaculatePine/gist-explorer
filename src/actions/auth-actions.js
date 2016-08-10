import cookie from 'react-cookie';
import GitHub from 'github-api';
import { camelizeKeys } from 'humps';
import * as actionTypes from '../constants/auth';

const COOKIE_NAME = 'gist_explorer_token';

function authenticateRequest(token) {
  return {
    type: actionTypes.AUTHENTICATE_REQUEST,
    payload: {
      token,
    },
  };
}

function authenticateSuccess(json) {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    payload: camelizeKeys(json.data),
  };
}

function authenticateFailure(error) {
  return {
    type: actionTypes.AUTHENTICATE_FAILURE,
    payload: {
      error: new Error(error.message),
    },
  };
}

export function signOut() {
  cookie.remove(COOKIE_NAME);
  return {
    type: actionTypes.SIGN_OUT,
  };
}

export function authenticate(token) {
  return dispatch => {
    dispatch(authenticateRequest(token));

    // There is no sense to make GitHub API call for an empty token
    if (!token) {
      return dispatch(signOut());
    }

    const gh = new GitHub({ token });
    const me = gh.getUser();
    return me.getProfile().then(
      (json) => { dispatch(authenticateSuccess(json)); },
      (error) => { dispatch(authenticateFailure(error)); }
    );
  };
}

export function readTokenFromCookies() {
  const token = cookie.load(COOKIE_NAME);
  return authenticate(token);
}
