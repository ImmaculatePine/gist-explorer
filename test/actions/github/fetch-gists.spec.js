import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import * as actions from '../../../src/actions/github/gist-previews-actions';
import * as types from '../../../src/constants/github';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const GITHUB_API = 'https://api.github.com';

describe('fetchGists(token)', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GISTS_REQUEST and GISTS_SUCCESS when fetching gists has been done with success', () => {
    nock(GITHUB_API)
      .get('/gists')
      .reply(200, [
        { id: '1', description: 'First' },
        { id: '2', description: 'Second' },
      ]);

    const expectedActions = [
      { type: types.GISTS_REQUEST },
      {
        type: types.GISTS_SUCCESS,
        payload: {
          entities: {
            gistPreviews: {
              '1': { id: '1', description: 'First' },
              '2': { id: '2', description: 'Second' },
            },
          },
          result: ['1', '2'],
        },
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchGists('fake-token'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('creates GISTS_REQUEST and GISTS_FAILURE when fetching gists failed', () => {
    nock(GITHUB_API)
      .get('/gists')
      .reply(401, {
        message: 'Bad credentials',
        documentation_url: 'https://developer.github.com/v3',
      });

    const expectedActions = [
      { type: types.GISTS_REQUEST },
      {
        type: types.GISTS_FAILURE,
        payload: new Error('error making request GET https://api.github.com/gists'),
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchGists('fake-token'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
