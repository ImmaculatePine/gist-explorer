import { expect } from 'chai'
import reducer from '../../../src/reducers/gists/list'
import * as actions from '../../../src/constants/github'

const initialState = {
  isFetching: false,
  selectedId: undefined
}

describe('gists list reducer', () => {
  it('returns the initial state by default', () => {
    const expectedState = initialState
    expect(reducer()).to.eql(expectedState)
  })

  it('handles SELECT_GIST action', () => {
    const action = {
      type: actions.SELECT_GIST,
      payload: 'gist-with-id-1'
    }

    const expectedState = {
      isFetching: false,
      selectedId: 'gist-with-id-1'
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles GISTS_REQUEST action', () => {
    const action = {
      type: actions.GISTS_REQUEST,
      payload: {}
    }

    const expectedState = {
      isFetching: true,
      selectedId: undefined
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles GISTS_SUCCESS action', () => {
    const action = {
      type: actions.GISTS_SUCCESS,
      payload: {}
    }

    const expectedState = {
      isFetching: false,
      selectedId: undefined
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles GISTS_FAILURE action', () => {
    const action = {
      type: actions.GISTS_FAILURE,
      payload: {}
    }

    const expectedState = {
      isFetching: false,
      selectedId: undefined
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })
})
