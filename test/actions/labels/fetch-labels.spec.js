import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import * as actions from '../../../src/actions/labels-actions';
import * as types from '../../../src/constants/labels';
import config from '../../../src/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchLabels(token)', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LABELS_REQUEST and LABELS_SUCCESS when fetching labels has been done with success', () => {
    nock(config.apiHost)
      .get('/labels')
      .reply(200, [
        { id: 1, name: 'Important', gist_ids: ['a', 'b'] },
        { id: 2, name: 'Other', gist_ids: ['c'] },
      ]);

    const expectedActions = [
      { type: types.LABELS_REQUEST },
      {
        type: types.LABELS_SUCCESS,
        payload: {
          entities: {
            labels: {
              1: { id: 1, name: 'Important', gistIds: ['a', 'b'] },
              2: { id: 2, name: 'Other', gistIds: ['c'] },
            },
          },
          result: [1, 2],
        },
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchLabels('fake-token'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('creates LABELS_REQUEST and LABELS_FAILURE when fetching labels failed', () => {
    nock(config.apiHost)
      .get('/labels')
      .reply(401, {
        message: 'Bad credentials',
      });

    const expectedActions = [
      { type: types.LABELS_REQUEST },
      {
        type: types.LABELS_FAILURE,
        payload: 'Unauthorized',
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchLabels('fake-token'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
