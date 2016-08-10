import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import * as actions from '../../../src/actions/labels-actions'
import * as types from '../../../src/constants/labels'
import config from '../../../src/config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('deleteLabel(token, labelId)', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates DELETE_LABEL_REQUEST and DELETE_LABEL_SUCCESS when label is deleted', () => {
    nock(config.apiHost)
      .delete('/labels/1')
      .reply(201, {
        id: 1, name: 'Important'
      })

    const expectedActions = [
      {
        type: types.DELETE_LABEL_REQUEST,
        payload: 1
      },
      {
        type: types.DELETE_LABEL_SUCCESS,
        payload: {
          entities: {
            labels: {
              1: { id: 1, name: 'Important' }
            }
          },
          result: 1
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteLabel('fake-token', 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })

  it('creates DELETE_LABEL_REQUEST and DELETE_LABEL_FAILURE when label was not deleted', () => {
    nock(config.apiHost)
      .delete('/labels/1')
      .reply(401, {
        message: 'Bad credentials'
      })

    const expectedActions = [
      {
        type: types.DELETE_LABEL_REQUEST,
        payload: 1
      },
      {
        type: types.DELETE_LABEL_FAILURE,
        payload: 'Unauthorized'
      }
    ]

    const store = mockStore({})

    return store.dispatch(actions.deleteLabel('fake-token', 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })
})
