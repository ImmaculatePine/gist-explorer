import { expect } from 'chai'
import reducer from '../../src/reducers/auth'
import * as authStates from '../../src/constants/auth-states'
import * as authActions from '../../src/constants/auth'

describe('auth reducer', () => {
  it('returns the initial state by default', () => {
    const expectedState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: '',
      user: {}
    }
    expect(reducer()).to.eql(expectedState)
  })

  it('handles USE_TOKEN action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_AUTHENTICATED,
      token: 'xxx',
      user: {
        id: 123
      }
    }
    const action = {
      type: authActions.USE_TOKEN,
      payload: {
        token: 'yyy'
      }
    }
    const expectedState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: 'yyy',
      user: {}
    }
    expect(reducer(intialState, action)).to.eql(expectedState)
  })

  it('handles AUTHENTICATE_SUCCESS action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: 'yyy',
      user: {}
    }
    const action = {
      type: authActions.AUTHENTICATE_SUCCESS,
      payload: {
        id: 1,
        login: 'defunkt',
        name: 'Chris Wanstrath'
      }
    }
    const expectedState = {
      state: authStates.AUTH_STATE_AUTHENTICATED,
      token: 'yyy',
      user: {
        id: 1,
        login: 'defunkt',
        name: 'Chris Wanstrath'
      }
    }
    expect(reducer(intialState, action)).to.eql(expectedState)
  })

  it('handles AUTHENTICATE_FAIL action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_UNKNOWN,
      token: 'yyy',
      user: {}
    }
    const action = {
      type: authActions.AUTHENTICATE_FAIL,
      payload: {
        error: new Error(':(')
      }
    }
    const expectedState = {
      state: authStates.AUTH_STATE_GUEST,
      token: '',
      user: {}
    }
    expect(reducer(intialState, action)).to.eql(expectedState)
  })

  it('handles SIGN_OUT action', () => {
    const intialState = {
      state: authStates.AUTH_STATE_AUTHENTICATED,
      token: 'yyy',
      user: {
        id: 1,
        login: 'defunkt',
        name: 'Chris Wanstrath'
      }
    }
    const action = {
      type: authActions.SIGN_OUT
    }
    const expectedState = {
      state: authStates.AUTH_STATE_GUEST,
      token: '',
      user: {}
    }
    expect(reducer(intialState, action)).to.eql(expectedState)
  })
})
