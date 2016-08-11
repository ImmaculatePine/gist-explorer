import { expect } from 'chai';
import reducer from '../../../src/reducers/gists/single';
import * as actions from '../../../src/constants/github';

const initialState = {
  isFetching: false,
};

describe('gists single reducer', () => {
  it('returns the initial state by default', () => {
    const expectedState = initialState;
    expect(reducer()).to.eql(expectedState);
  });

  it('handles GIST_REQUEST action', () => {
    const action = {
      type: actions.GIST_REQUEST,
      payload: {},
    };

    const expectedState = {
      isFetching: true,
    };

    expect(reducer(initialState, action)).to.eql(expectedState);
  });

  it('handles GIST_SUCCESS action', () => {
    const action = {
      type: actions.GIST_SUCCESS,
      payload: {},
    };

    const expectedState = {
      isFetching: false,
    };

    expect(reducer(initialState, action)).to.eql(expectedState);
  });

  it('handles GIST_FAILURE action', () => {
    const action = {
      type: actions.GIST_FAILURE,
      payload: {},
    };

    const expectedState = {
      isFetching: false,
    };

    expect(reducer(initialState, action)).to.eql(expectedState);
  });
});
