import * as actionTypes from '../constants/auth';
import * as authStates from '../constants/auth-states';

const initialState = {
  state: authStates.AUTH_STATE_UNKNOWN,
  token: '',
  user: {},
};

export default function userReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case actionTypes.AUTHENTICATE_REQUEST:
    return {
      ...state,
      state: authStates.AUTH_STATE_UNKNOWN,
      token: payload.token,
      user: {},
    };

  case actionTypes.AUTHENTICATE_SUCCESS:
    return {
      ...state,
      state: authStates.AUTH_STATE_AUTHENTICATED,
      user: {
        id: payload.id,
        login: payload.login,
        name: payload.name,
        avatarUrl: payload.avatarUrl,
        url: payload.htmlUrl,
      },
    };

  case actionTypes.AUTHENTICATE_FAILURE:
  case actionTypes.SIGN_OUT:
    return {
      ...state,
      state: authStates.AUTH_STATE_GUEST,
      token: '',
      user: {},
    };

  default:
    return state;
  }
}
