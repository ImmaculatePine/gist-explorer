import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import * as actions from '../../../src/actions/labels-actions'
import * as types from '../../../src/constants/labels'
import config from '../../../src/config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('toggleLabelOnGist(token, labelId, gistId)', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates TOGGLE_LABLE_ON_GIST_REQUEST and TOGGLE_LABLE_ON_GIST_SUCCESS when label is toggled', () => {
    nock(config.apiHost)
      .post('/labels/1/gists')
      .reply(201, {
        id: 1, name: 'Important', gist_ids: ['a']
      })

    const expectedActions = [
      {
        type: types.TOGGLE_LABLE_ON_GIST_REQUEST,
        payload: {
          labelId: 1,
          gistId: 'a'
        }
      },
      {
        type: types.TOGGLE_LABLE_ON_GIST_SUCCESS,
        payload: {
          entities: {
            labels: {
              1: { id: 1, name: 'Important', gistIds: ['a'] }
            }
          },
          result: 1
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.toggleLabelOnGist('fake-token', 1, 'a'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })

  it('creates TOGGLE_LABLE_ON_GIST_REQUEST and TOGGLE_LABLE_ON_GIST_FAILURE when label was not toggled', () => {
    nock(config.apiHost)
      .post('/labels/1/gists')
      .reply(401, {
        message: 'Bad credentials'
      })

    const expectedActions = [
      {
        type: types.TOGGLE_LABLE_ON_GIST_REQUEST,
        payload: {
          labelId: 1,
          gistId: 'a'
        }
      },
      {
        type: types.TOGGLE_LABLE_ON_GIST_FAILURE,
        payload: 'Unauthorized'
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.toggleLabelOnGist('fake-token', 1, 'a'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })
})
