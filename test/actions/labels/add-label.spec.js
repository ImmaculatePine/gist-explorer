import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import * as actions from '../../../src/actions/labels-actions';
import * as types from '../../../src/constants/labels';
import config from '../../../src/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addLabel(token, name)', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates ADD_LABEL_REQUEST and ADD_LABEL_SUCCESS when label is added', () => {
    nock(config.apiHost)
      .post('/labels')
      .reply(201, {
        id: 1, name: 'Important',
      });

    const expectedActions = [
      {
        type: types.ADD_LABEL_REQUEST,
        payload: {
          name: 'Important',
        },
      },
      {
        type: types.ADD_LABEL_SUCCESS,
        payload: {
          entities: {
            labels: {
              1: { id: 1, name: 'Important' },
            },
          },
          result: 1,
        },
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.addLabel('fake-token', 'Important'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('creates ADD_LABEL_REQUEST and ADD_LABEL_FAILURE when label was not added', () => {
    nock(config.apiHost)
      .post('/labels')
      .reply(401, {
        message: 'Bad credentials',
      });

    const expectedActions = [
      {
        type: types.ADD_LABEL_REQUEST,
        payload: {
          name: 'Important',
        },
      },
      {
        type: types.ADD_LABEL_FAILURE,
        payload: 'Unauthorized',
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.addLabel('fake-token', 'Important'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
