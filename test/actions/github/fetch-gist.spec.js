import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import * as actions from '../../../src/actions/github/gist-actions';
import * as types from '../../../src/constants/github';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const GITHUB_API = 'https://api.github.com';

describe('fetchGist(id, token)', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GIST_REQUEST, SELECT_GIST and GIST_SUCCESS when fetching gist has been done with success', () => {
    nock(GITHUB_API)
      .get('/gists/1')
      .reply(200, { id: '1', description: 'First' });

    const expectedActions = [
      {
        type: types.GIST_REQUEST,
        payload: '1',
      },
      {
        type: types.SELECT_GIST,
        payload: '1',
      },
      {
        type: types.GIST_SUCCESS,
        payload: {
          entities: {
            gists: {
              '1': { id: '1', description: 'First' },
            },
          },
          result: '1',
        },
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchGist('1', 'fake-token'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('creates GIST_REQUEST, SELECT_GIST and GIST_FAILURE when fetching gist failed', () => {
    nock(GITHUB_API)
      .get('/gists/1')
      .reply(401, {
        message: 'Bad credentials',
        documentation_url: 'https://developer.github.com/v3',
      });

    const expectedActions = [
      {
        type: types.GIST_REQUEST,
        payload: '1',
      },
      {
        type: types.SELECT_GIST,
        payload: '1',
      },
      {
        type: types.GIST_FAILURE,
        payload: new Error('error making request GET https://api.github.com/gists/1'),
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchGist('1', 'fake-token'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
