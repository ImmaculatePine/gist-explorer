import { expect } from 'chai'
import reducer from '../../src/reducers/labels'
import * as actions from '../../src/constants/labels'

const initialState = {
  isFetching: false,
  selectedId: undefined
}

describe('labels reducer', () => {
  it('returns the initial state by default', () => {
    const expectedState = initialState
    expect(reducer()).to.eql(expectedState)
  })

  it('handles LABELS_REQUEST action', () => {
    const action = {
      type: actions.LABELS_REQUEST
    }

    const expectedState = {
      isFetching: true,
      selectedId: undefined
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles LABELS_SUCCESS action', () => {
    const action = {
      type: actions.LABELS_SUCCESS
    }

    const expectedState = {
      isFetching: false,
      selectedId: undefined
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles LABELS_FAILURE action', () => {
    const action = {
      type: actions.LABELS_FAILURE
    }

    const expectedState = {
      isFetching: false,
      selectedId: undefined
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles SELECT_LABEL action', () => {
    const action = {
      type: actions.SELECT_LABEL,
      payload: 1
    }

    const expectedState = {
      isFetching: false,
      selectedId: 1
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })
})
