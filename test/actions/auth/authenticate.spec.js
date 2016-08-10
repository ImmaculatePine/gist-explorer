import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import * as actions from '../../../src/actions/auth-actions'
import * as types from '../../../src/constants/auth'
import * as authStates from '../../../src/constants/auth-states'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const GITHUB_API = 'https://api.github.com'

describe('authenticate(token)', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates AUTHENTICATE_SUCCESS when fetching user profile has been done with success', () => {
    nock(GITHUB_API)
      .get('/user')
      .reply(200, {
        login: 'ImmaculatePine',
        id: 1697925,
        name: 'Alexander Borovykh'
      })

    const expectedActions = [
      {
        type: types.AUTHENTICATE_REQUEST,
        payload: {
          token: 'XYZ'
        }
      },
      {
        type: types.AUTHENTICATE_SUCCESS,
        payload: {
          login: 'ImmaculatePine',
          id: 1697925,
          name: 'Alexander Borovykh'
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.authenticate('XYZ'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })

  it('creates AUTHENTICATE_FAILURE when fetching user profile has been done with error', () => {
    nock(GITHUB_API)
      .get('/user')
      .reply(401, {
        message: 'Bad credentials',
        documentation_url: 'https://developer.github.com/v3'
      })

    const expectedActions = [
      {
        type: types.AUTHENTICATE_REQUEST,
        payload: {
          token: 'XYZ'
        }
      },
      {
        type: types.AUTHENTICATE_FAILURE,
        payload: {
          error: new Error('Bad credentials')
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.authenticate('XYZ'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })
})
