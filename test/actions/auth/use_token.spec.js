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

describe('useToken(token)', () => {
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
        type: types.USE_TOKEN,
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

    return store.dispatch(actions.useToken('XYZ'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })

  it('creates AUTHENTICATE_FAIL when fetching user profile has been done with error', () => {
    nock(GITHUB_API)
      .get('/user')
      .reply(401, {
        message: 'Bad credentials',
        documentation_url: 'https://developer.github.com/v3'
      })

    const expectedActions = [
      {
        type: types.USE_TOKEN,
        payload: {
          token: 'XYZ'
        }
      },
      {
        type: types.AUTHENTICATE_FAIL,
        payload: {
          error: new Error('Bad credentials')
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.useToken('XYZ'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })
})
