import { expect } from 'chai';
import reducer from '../../src/reducers/auth';
import * as authStates from '../../src/constants/auth-states';
import * as authActions from '../../src/constants/auth';

describe('auth reducer', () => {
  it('returns the initial state by default', () => {
    const expectedState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: '',
      user: {},
    };
    expect(reducer()).to.eql(expectedState);
  });

  it('handles AUTHENTICATE_REQUEST action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_AUTHENTICATED,
      token: 'xxx',
      user: {
        id: 123,
      },
    };
    const action = {
      type: authActions.AUTHENTICATE_REQUEST,
      payload: {
        token: 'yyy',
      },
    };
    const expectedState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: 'yyy',
      user: {},
    };
    expect(reducer(intialState, action)).to.eql(expectedState);
  });

  it('handles AUTHENTICATE_SUCCESS action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: 'yyy',
      user: {},
    };
    const action = {
      type: authActions.AUTHENTICATE_SUCCESS,
      payload: {
        id: 1,
        login: 'defunkt',
        name: 'Chris Wanstrath',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/2?v=3&s=400',
        htmlUrl: 'https://github.com/defunkt',
      },
    };
    const expectedState = {
      state: authStates.AUTH_STATE_AUTHENTICATED,
      token: 'yyy',
      user: {
        id: 1,
        login: 'defunkt',
        name: 'Chris Wanstrath',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/2?v=3&s=400',
        url: 'https://github.com/defunkt',
      },
    };
    expect(reducer(intialState, action)).to.eql(expectedState);
  });

  it('handles AUTHENTICATE_FAILURE action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: 'yyy',
      user: {},
    };
    const action = {
      type: authActions.AUTHENTICATE_FAILURE,
      payload: {
        error: new Error(':('),
      },
    };
    const expectedState = {
      state: authStates.AUTH_STATE_GUEST,
      token: '',
      user: {},
    };
    expect(reducer(intialState, action)).to.eql(expectedState);
  });

  it('handles SIGN_OUT action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_AUTHENTICATED,
      token: 'yyy',
      user: {
        id: 1,
        login: 'defunkt',
        name: 'Chris Wanstrath',
      },
    };
    const action = {
      type: authActions.SIGN_OUT,
    };
    const expectedState = {
      state: authStates.AUTH_STATE_GUEST,
      token: '',
      user: {},
    };
    expect(reducer(intialState, action)).to.eql(expectedState);
  });
});
