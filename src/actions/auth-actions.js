import {
  USE_TOKEN,
  SIGN_OUT,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL
} from '../constants/auth';
import cookie from 'react-cookie';
import GitHub from 'github-api';

const COOKIE_NAME = 'gist_explorer_token';

export function useToken(token) {
  return dispatch => {
    dispatch({
      type: USE_TOKEN,
      payload: {
        token: token
      }
    });

    // There is no sense to make GitHub API call
    // for an empty token
    if (!token) { 
      return dispatch(signOut());
    }

    const gh = new GitHub({token: token});
    const me = gh.getUser();
    return me.getProfile().then(
      (json) => {
        dispatch({
          type: AUTHENTICATE_SUCCESS,
          payload: json.data
        });
      },
      (error) => {
        dispatch({
          type: AUTHENTICATE_FAIL,
          payload: {
            error: new Error(error)
          }
        });
      }
    );
  };
}

export function readTokenFromCookies() {
  const token = cookie.load(COOKIE_NAME);
  return useToken(token);
}

export function signOut() {
  cookie.remove(COOKIE_NAME);
  return {
    type: SIGN_OUT
  };
}
