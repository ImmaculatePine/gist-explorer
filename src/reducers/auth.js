import { USE_TOKEN, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, SIGN_OUT } from '../constants/auth';
import { AUTH_STATE_UNKNOWN, AUTH_STATE_GUEST, AUTH_STATE_AUTHENTICATED } from '../constants/auth-states';

const initialState = {
  state: AUTH_STATE_UNKNOWN,
  token: '',
  user: {}
};

export default function userReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case USE_TOKEN:
      return {
        ...state,
        state: AUTH_STATE_UNKNOWN,
        token: payload.token,
        user: {}
      };

    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        state: AUTH_STATE_AUTHENTICATED,
        user: {
          id: payload.id,
          login: payload.login,
          name: payload.name
        }
      };

    case AUTHENTICATE_FAIL:
    case SIGN_OUT:
      return {
        ...state,
        state: AUTH_STATE_GUEST,
        token: '',
        user: {}
      };

    default:
      return state;
  }
}
